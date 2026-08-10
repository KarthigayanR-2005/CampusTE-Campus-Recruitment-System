import {
  createHash,
  createPrivateKey,
  createPublicKey,
  randomBytes,
  sign,
  verify,
} from "node:crypto";

import {
  createReadStream,
} from "node:fs";

import {
  readFile,
} from "node:fs/promises";

import path from "node:path";

import {
  fileURLToPath,
} from "node:url";

import QRCode from "qrcode";

const DEFAULT_PUBLIC_APP_URL =
  "http://localhost:5173";

const currentFilePath =
  fileURLToPath(
    import.meta.url
  );

const currentDirectory =
  path.dirname(
    currentFilePath
  );

const serverRoot =
  path.resolve(
    currentDirectory,
    "../.."
  );

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
      new URL(
        rawValue
      );

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
    process.env.PUBLIC_APP_URL ||
    process.env.CLIENT_URL ||
    DEFAULT_PUBLIC_APP_URL
  );
}

function resolveSigningKeyPath({
  environmentValue,
  fallback,
}) {
  const configuredPath =
    String(
      environmentValue ||
      fallback
    ).trim();

  if (
    path.isAbsolute(
      configuredPath
    )
  ) {
    return configuredPath;
  }

  return path.resolve(
    serverRoot,
    configuredPath
  );
}

function validateSha256(
  value
) {
  return (
    typeof value ===
      "string" &&
    /^[a-fA-F0-9]{64}$/.test(
      value
    )
  );
}

async function loadPrivateSigningKey() {
  const privateKeyPath =
    resolveSigningKeyPath({
      environmentValue:
        process.env
          .OFFER_SIGNING_PRIVATE_KEY_PATH,

      fallback:
        "keys/offer-signing-private.pem",
    });

  const privateKeyPem =
    await readFile(
      privateKeyPath,
      "utf8"
    );

  return createPrivateKey(
    privateKeyPem
  );
}

async function loadPublicSigningKey() {
  const publicKeyPath =
    resolveSigningKeyPath({
      environmentValue:
        process.env
          .OFFER_SIGNING_PUBLIC_KEY_PATH,

      fallback:
        "keys/offer-signing-public.pem",
    });

  const publicKeyPem =
    await readFile(
      publicKeyPath,
      "utf8"
    );

  return createPublicKey(
    publicKeyPem
  );
}

function createSigningKeyId(
  publicKey
) {
  const publicKeyDer =
    publicKey.export({
      type:
        "spki",

      format:
        "der",
    });

  const fingerprint =
    createHash(
      "sha256"
    )
      .update(
        publicKeyDer
      )
      .digest(
        "hex"
      )
      .slice(
        0,
        20
      )
      .toUpperCase();

  return `ED25519-${fingerprint}`;
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
    .digest(
      "hex"
    );
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
      .toString(
        "hex"
      )
      .toUpperCase();

  const verificationPublicId =
    `CTE-OFFER-${offerId}-${publicSuffix}`;

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

        margin:
          1,

        width:
          260,

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

export function calculateBufferSha256(
  buffer
) {
  if (
    !Buffer.isBuffer(
      buffer
    )
  ) {
    throw new Error(
      "A valid file buffer is required."
    );
  }

  return createHash(
    "sha256"
  )
    .update(
      buffer
    )
    .digest(
      "hex"
    );
}

export function hasPdfFileSignature(
  buffer
) {
  if (
    !Buffer.isBuffer(
      buffer
    ) ||
    buffer.length < 5
  ) {
    return false;
  }

  return (
    buffer
      .subarray(
        0,
        5
      )
      .toString(
        "ascii"
      ) === "%PDF-"
  );
}

export async function signDocumentSha256(
  documentSha256
) {
  if (
    !validateSha256(
      documentSha256
    )
  ) {
    throw new Error(
      "A valid SHA-256 document fingerprint is required."
    );
  }

  const [
    privateKey,
    publicKey,
  ] =
    await Promise.all([
      loadPrivateSigningKey(),
      loadPublicSigningKey(),
    ]);

  const digestBuffer =
    Buffer.from(
      documentSha256,
      "hex"
    );

  const signatureBuffer =
    sign(
      null,
      digestBuffer,
      privateKey
    );

  return {
    algorithm:
      "Ed25519",

    signatureBase64:
      signatureBuffer
        .toString(
          "base64"
        ),

    signingKeyId:
      createSigningKeyId(
        publicKey
      ),
  };
}

export async function verifyDocumentSignature({
  documentSha256,
  signatureBase64,
  signingKeyId,
}) {
  if (
    !validateSha256(
      documentSha256
    )
  ) {
    return false;
  }

  if (
    typeof signatureBase64 !==
      "string" ||
    !signatureBase64.trim()
  ) {
    return false;
  }

  try {
    const publicKey =
      await loadPublicSigningKey();

    const expectedKeyId =
      createSigningKeyId(
        publicKey
      );

    if (
      signingKeyId &&
      signingKeyId !==
        expectedKeyId
    ) {
      return false;
    }

    const digestBuffer =
      Buffer.from(
        documentSha256,
        "hex"
      );

    const signatureBuffer =
      Buffer.from(
        signatureBase64,
        "base64"
      );

    return verify(
      null,
      digestBuffer,
      publicKey,
      signatureBuffer
    );
  } catch (error) {
    console.error(
      "Document signature verification error:",
      error
    );

    return false;
  }
}