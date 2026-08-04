import {
    createHash,
    randomBytes,
  } from "node:crypto";
  
  import {
    createReadStream,
  } from "node:fs";
  
  import QRCode from "qrcode";
  
  const DEFAULT_PUBLIC_APP_URL =
    "http://localhost:5173";
  
  function normalizeBaseUrl(
    value
  ) {
    const rawValue =
      String(
        value ||
        DEFAULT_PUBLIC_APP_URL
      ).trim();
  
    try {
      const parsedUrl =
        new URL(rawValue);
  
      if (
        ![
          "http:",
          "https:",
        ].includes(
          parsedUrl.protocol
        )
      ) {
        return DEFAULT_PUBLIC_APP_URL;
      }
  
      return rawValue.replace(
        /\/+$/,
        ""
      );
    } catch {
      return DEFAULT_PUBLIC_APP_URL;
    }
  }
  
  function getPublicApplicationUrl() {
    return normalizeBaseUrl(
      process.env
        .PUBLIC_APP_URL ||
        process.env
          .CLIENT_URL ||
        DEFAULT_PUBLIC_APP_URL
    );
  }
  
  export function createSha256(
    value
  ) {
    return createHash(
      "sha256"
    )
      .update(
        String(value),
        "utf8"
      )
      .digest("hex");
  }
  
  export function hashVerificationToken(
    rawToken
  ) {
    return createSha256(
      rawToken
    );
  }
  
  export function createOfferVerificationCredentials({
    offerId,
  }) {
    const publicSuffix =
      randomBytes(8)
        .toString("hex")
        .toUpperCase();
  
    const verificationPublicId =
      `CTE-OFFER-${offerId}-${publicSuffix}`;
  
    /*
    |--------------------------------------------------------------------------
    | Secret verification token
    |--------------------------------------------------------------------------
    |
    | Only the SHA-256 hash is stored in MySQL.
    | The original token is placed inside the QR verification URL.
    |
    */
  
    const rawToken =
      randomBytes(32)
        .toString(
          "base64url"
        );
  
    const verificationTokenHash =
      hashVerificationToken(
        rawToken
      );
  
    const publicApplicationUrl =
      getPublicApplicationUrl();
  
    const verificationUrl =
      `${publicApplicationUrl}/verify-offer/${encodeURIComponent(
        verificationPublicId
      )}?token=${encodeURIComponent(
        rawToken
      )}`;
  
    return {
      verificationPublicId,
      rawToken,
      verificationTokenHash,
      verificationUrl,
    };
  }
  
  export async function createVerificationQrBuffer(
    verificationUrl
  ) {
    const qrDataUrl =
      await QRCode.toDataURL(
        verificationUrl,
        {
          type:
            "image/png",
  
          errorCorrectionLevel:
            "M",
  
          margin: 1,
  
          width: 260,
  
          color: {
            dark:
              "#111827",
  
            light:
              "#FFFFFF",
          },
        }
      );
  
    const separatorIndex =
      qrDataUrl.indexOf(
        ","
      );
  
    if (
      separatorIndex === -1
    ) {
      throw new Error(
        "Unable to create the verification QR image."
      );
    }
  
    const encodedImage =
      qrDataUrl.slice(
        separatorIndex + 1
      );
  
    return Buffer.from(
      encodedImage,
      "base64"
    );
  }
  
  export async function calculateFileSha256(
    absoluteFilePath
  ) {
    const hash =
      createHash(
        "sha256"
      );
  
    const fileStream =
      createReadStream(
        absoluteFilePath
      );
  
    for await (
      const chunk of fileStream
    ) {
      hash.update(
        chunk
      );
    }
  
    return hash.digest(
      "hex"
    );
  }