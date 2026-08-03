import crypto from "node:crypto";
import fs from "node:fs";
import fileSystem from "node:fs/promises";
import path from "node:path";

import PDFDocument from "pdfkit";

const offerLetterDirectory =
  path.resolve(
    process.cwd(),
    "uploads",
    "offer-letters"
  );

const pageMargins = {
  top: 54,
  bottom: 64,
  left: 58,
  right: 58,
};

function readText(
  value,
  fallback = ""
) {
  if (
    typeof value ===
    "string"
  ) {
    const normalizedValue =
      value.trim();

    return (
      normalizedValue ||
      fallback
    );
  }

  if (
    value === null ||
    value === undefined
  ) {
    return fallback;
  }

  return String(value);
}

function createSafeFilePart(
  value,
  fallback
) {
  const safeValue =
    readText(
      value,
      fallback
    )
      .normalize("NFKD")
      .replace(
        /[^a-zA-Z0-9]+/g,
        "_"
      )
      .replace(
        /^_+|_+$/g,
        ""
      )
      .slice(0, 60);

  return (
    safeValue ||
    fallback
  );
}

function formatDate(value) {
  if (!value) {
    return "Not provided";
  }

  const rawValue =
    value instanceof Date
      ? value
      : new Date(
          `${String(value).slice(
            0,
            10
          )}T00:00:00`
        );

  if (
    Number.isNaN(
      rawValue.getTime()
    )
  ) {
    return String(value);
  }

  return rawValue
    .toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    );
}

function formatMoney({
  amount,
  currency,
  period,
}) {
  const numericAmount =
    Number(amount);

  if (
    !Number.isFinite(
      numericAmount
    )
  ) {
    return "Not disclosed";
  }

  const formattedAmount =
    new Intl.NumberFormat(
      "en-IN",
      {
        maximumFractionDigits:
          2,
      }
    ).format(
      numericAmount
    );

  return `${readText(
    currency,
    "INR"
  )} ${formattedAmount} ${
    period === "monthly"
      ? "per month"
      : "per year"
  }`;
}

function getContentWidth(
  document
) {
  return (
    document.page.width -
    pageMargins.left -
    pageMargins.right
  );
}

function setBodyTextStyle(
  document
) {
  document
    .font("Helvetica")
    .fontSize(10.5)
    .fillColor("#374151");
}

function drawImageSafely(
  document,
  absoluteFilePath,
  x,
  y,
  options
) {
  if (!absoluteFilePath) {
    return false;
  }

  try {
    document.image(
      absoluteFilePath,
      x,
      y,
      options
    );

    return true;
  } catch (error) {
    console.error(
      "Offer-letter branding image error:",
      error
    );

    return false;
  }
}

function drawMainHeader(
  document,
  offer,
  branding
) {
  const companyName =
    readText(
      offer.company
        ?.companyName,
      "Company"
    );

  const companyDetails = [
    offer.company
      ?.headquarters,

    offer.company
      ?.website,

    offer.company
      ?.contactEmail,
  ]
    .filter(Boolean)
    .join(" | ");

  const logoPath =
    branding?.logo
      ?.absoluteFilePath ||
    "";

  const contentWidth =
    getContentWidth(
      document
    );

  const logoBoxWidth =
    logoPath
      ? 84
      : 0;

  const logoGap =
    logoPath
      ? 18
      : 0;

  const companyTextWidth =
    contentWidth -
    logoBoxWidth -
    logoGap;

  document.save();

  document
    .rect(
      0,
      0,
      document.page.width,
      122
    )
    .fill("#1D4ED8");

  document
    .fillColor("#FFFFFF")
    .font(
      "Helvetica-Bold"
    )
    .fontSize(24)
    .text(
      companyName,
      pageMargins.left,
      32,
      {
        width:
          companyTextWidth,

        align: "left",
      }
    );

  document
    .font(
      "Helvetica"
    )
    .fontSize(8.5)
    .fillColor("#DBEAFE")
    .text(
      companyDetails ||
        "Employment and Recruitment",
      pageMargins.left,
      70,
      {
        width:
          companyTextWidth,

        lineGap: 2,
      }
    );

  document
    .font(
      "Helvetica-Bold"
    )
    .fontSize(12)
    .fillColor("#FFFFFF")
    .text(
      "EMPLOYMENT OFFER LETTER",
      pageMargins.left,
      96,
      {
        width:
          companyTextWidth,

        characterSpacing:
          1.2,
      }
    );

  if (logoPath) {
    const logoBoxX =
      document.page.width -
      pageMargins.right -
      logoBoxWidth;

    const logoBoxY = 21;
    const logoBoxHeight = 78;

    document
      .roundedRect(
        logoBoxX,
        logoBoxY,
        logoBoxWidth,
        logoBoxHeight,
        8
      )
      .fill("#FFFFFF");

    drawImageSafely(
      document,
      logoPath,
      logoBoxX + 8,
      logoBoxY + 8,
      {
        fit: [
          logoBoxWidth - 16,
          logoBoxHeight - 16,
        ],

        align: "center",
        valign: "center",
      }
    );
  }

  document.restore();

  document.y = 148;
}

function drawContinuationHeader(
  document,
  offer
) {
  const companyName =
    readText(
      offer.company
        ?.companyName,
      "Company"
    );

  document.save();

  document
    .rect(
      0,
      0,
      document.page.width,
      68
    )
    .fill("#1D4ED8");

  document
    .font(
      "Helvetica-Bold"
    )
    .fontSize(13)
    .fillColor("#FFFFFF")
    .text(
      `${companyName} - Offer Letter`,
      pageMargins.left,
      24,
      {
        width: 340,
      }
    );

  document
    .font(
      "Helvetica"
    )
    .fontSize(9)
    .fillColor("#DBEAFE")
    .text(
      `Offer ID: ${
        offer.offerId
      }`,
      document.page.width -
        pageMargins.right -
        160,
      27,
      {
        width: 160,
        align: "right",
      }
    );

  document.restore();

  setBodyTextStyle(
    document
  );

  document.y = 92;
}

function ensureSpace(
  document,
  requiredHeight
) {
  const availableBottom =
    document.page.height -
    pageMargins.bottom;

  if (
    document.y +
      requiredHeight >
    availableBottom
  ) {
    document.addPage();
  }
}

function drawSectionTitle(
  document,
  title
) {
  ensureSpace(
    document,
    42
  );

  document
    .font(
      "Helvetica-Bold"
    )
    .fontSize(13)
    .fillColor("#1E3A8A")
    .text(
      title,
      pageMargins.left,
      document.y,
      {
        width:
          getContentWidth(
            document
          ),
      }
    );

  document
    .moveDown(0.45)
    .save()
    .moveTo(
      pageMargins.left,
      document.y
    )
    .lineTo(
      document.page.width -
        pageMargins.right,
      document.y
    )
    .lineWidth(1)
    .strokeColor("#BFDBFE")
    .stroke()
    .restore();

  document.moveDown(0.75);
}

function drawOfferDetails(
  document,
  offer
) {
  const details = [
    {
      label:
        "Offered Designation",

      value:
        readText(
          offer.designation,
          "Not provided"
        ),
    },

    {
      label:
        "Employment Type",

      value:
        readText(
          offer.employmentType ||
            offer.job
              ?.employmentType,
          "Not provided"
        ),
    },

    {
      label:
        "Compensation",

      value:
        formatMoney({
          amount:
            offer.compensation
              ?.amount,

          currency:
            offer.compensation
              ?.currency,

          period:
            offer.compensation
              ?.period,
        }),
    },

    {
      label:
        "Joining Date",

      value:
        formatDate(
          offer.joiningDate
        ),
    },

    {
      label:
        "Work Location",

      value:
        readText(
          offer.workLocation,
          "Not provided"
        ),
    },

    {
      label:
        "Probation Period",

      value:
        readText(
          offer.probationPeriod,
          "Not applicable"
        ),
    },

    {
      label:
        "Offer Valid Until",

      value:
        formatDate(
          offer.offerExpiryDate
        ),
    },
  ];

  const contentWidth =
    getContentWidth(
      document
    );

  const rowHeight = 38;

  const boxHeight =
    46 +
    details.length *
      rowHeight;

  ensureSpace(
    document,
    boxHeight + 24
  );

  const startX =
    pageMargins.left;

  const startY =
    document.y;

  document
    .save()
    .roundedRect(
      startX,
      startY,
      contentWidth,
      boxHeight,
      8
    )
    .fillAndStroke(
      "#F8FAFC",
      "#CBD5E1"
    )
    .restore();

  document
    .font(
      "Helvetica-Bold"
    )
    .fontSize(11)
    .fillColor("#1E3A8A")
    .text(
      "OFFER DETAILS",
      startX + 16,
      startY + 16
    );

  let currentY =
    startY + 46;

  details.forEach(
    (
      detail,
      index
    ) => {
      document
        .font(
          "Helvetica-Bold"
        )
        .fontSize(9.5)
        .fillColor("#475569")
        .text(
          detail.label,
          startX + 16,
          currentY + 10,
          {
            width: 145,
          }
        );

      document
        .font(
          "Helvetica"
        )
        .fontSize(10)
        .fillColor("#111827")
        .text(
          detail.value,
          startX + 172,
          currentY + 10,
          {
            width:
              contentWidth -
              190,

            lineBreak: true,
          }
        );

      if (
        index <
        details.length - 1
      ) {
        document
          .save()
          .moveTo(
            startX + 16,
            currentY +
              rowHeight
          )
          .lineTo(
            startX +
              contentWidth -
              16,
            currentY +
              rowHeight
          )
          .lineWidth(0.6)
          .strokeColor(
            "#E2E8F0"
          )
          .stroke()
          .restore();
      }

      currentY +=
        rowHeight;
    }
  );

  document.y =
    startY +
    boxHeight +
    22;
}

function drawTerms(
  document,
  offer
) {
  drawSectionTitle(
    document,
    "Terms and Conditions"
  );

  const terms =
    readText(
      offer.terms
    );

  const defaultTerms = [
    "1. This offer is subject to successful verification of the information and documents provided during the recruitment process.",

    "2. You are expected to comply with the policies, confidentiality requirements and professional standards of the company.",

    "3. Compensation, benefits and employment conditions will be governed by the company's applicable policies.",

    "4. Please communicate your acceptance before the offer expiry date mentioned in this letter.",
  ].join("\n\n");

  setBodyTextStyle(
    document
  );

  document.text(
    terms ||
      defaultTerms,
    pageMargins.left,
    document.y,
    {
      width:
        getContentWidth(
          document
        ),

      align: "left",
      lineGap: 4,
    }
  );

  document.moveDown(1.4);
}

function drawSignatureSection(
  document,
  offer,
  branding
) {
  ensureSpace(
    document,
    230
  );

  drawSectionTitle(
    document,
    "Authorization and Acceptance"
  );

  document
    .font(
      "Helvetica"
    )
    .fontSize(10)
    .fillColor("#374151")
    .text(
      "Please review the complete offer and record your response through the CampusTE Student Portal before the offer expiry date.",
      pageMargins.left,
      document.y,
      {
        width:
          getContentWidth(
            document
          ),

        lineGap: 3,
      }
    );

  document.moveDown(1.5);

  const contentWidth =
    getContentWidth(
      document
    );

  const columnGap = 44;

  const columnWidth =
    (
      contentWidth -
      columnGap
    ) / 2;

  const leftX =
    pageMargins.left;

  const rightX =
    pageMargins.left +
    columnWidth +
    columnGap;

  const signaturePath =
    branding?.signature
      ?.absoluteFilePath ||
    "";

  const signatureTop =
    document.y + 4;

  const signatureHeight =
    signaturePath
      ? 56
      : 28;

  if (signaturePath) {
    drawImageSafely(
      document,
      signaturePath,
      leftX,
      signatureTop,
      {
        fit: [
          columnWidth,
          signatureHeight,
        ],

        align: "left",
        valign: "center",
      }
    );
  } else {
    document
      .font(
        "Helvetica-Oblique"
      )
      .fontSize(8.5)
      .fillColor("#94A3B8")
      .text(
        "Authorized signature",
        leftX,
        signatureTop + 8,
        {
          width:
            columnWidth,

          align: "left",
        }
      );
  }

  const lineY =
    signatureTop +
    signatureHeight +
    8;

  document
    .save()
    .moveTo(
      leftX,
      lineY
    )
    .lineTo(
      leftX +
        columnWidth,
      lineY
    )
    .strokeColor("#64748B")
    .lineWidth(0.8)
    .stroke()
    .restore();

  document
    .save()
    .moveTo(
      rightX,
      lineY
    )
    .lineTo(
      rightX +
        columnWidth,
      lineY
    )
    .strokeColor("#64748B")
    .lineWidth(0.8)
    .stroke()
    .restore();

  document
    .font(
      "Helvetica-Bold"
    )
    .fontSize(10)
    .fillColor("#111827")
    .text(
      readText(
        offer.recruiter
          ?.fullName,
        "Authorized Recruiter"
      ),
      leftX,
      lineY + 9,
      {
        width:
          columnWidth,
      }
    );

  document
    .font(
      "Helvetica"
    )
    .fontSize(9)
    .fillColor("#475569")
    .text(
      readText(
        offer.recruiter
          ?.designation,
        "Authorized Signatory"
      ),
      leftX,
      lineY + 26,
      {
        width:
          columnWidth,
      }
    );

  document
    .font(
      "Helvetica"
    )
    .fontSize(9)
    .fillColor("#64748B")
    .text(
      `For ${readText(
        offer.company
          ?.companyName,
        "the Company"
      )}`,
      leftX,
      lineY + 41,
      {
        width:
          columnWidth,
      }
    );

  document
    .font(
      "Helvetica-Bold"
    )
    .fontSize(10)
    .fillColor("#111827")
    .text(
      readText(
        offer.student
          ?.fullName,
        "Candidate"
      ),
      rightX,
      lineY + 9,
      {
        width:
          columnWidth,
      }
    );

  document
    .font(
      "Helvetica"
    )
    .fontSize(9)
    .fillColor("#64748B")
    .text(
      "Candidate Acceptance",
      rightX,
      lineY + 26,
      {
        width:
          columnWidth,
      }
    );

  document
    .font(
      "Helvetica"
    )
    .fontSize(8.5)
    .fillColor("#64748B")
    .text(
      "Response recorded digitally through CampusTE",
      rightX,
      lineY + 41,
      {
        width:
          columnWidth,
      }
    );

  document.y =
    lineY + 76;

  document
    .font(
      "Helvetica-Oblique"
    )
    .fontSize(8.5)
    .fillColor("#64748B")
    .text(
      "This document was generated through CampusTE using the offer information and branding approved by the Recruiter.",
      pageMargins.left,
      document.y,
      {
        width:
          contentWidth,

        align: "center",
      }
    );
}

function addPageFooters(
  document,
  offer
) {
  const pageRange =
    document.bufferedPageRange();

  for (
    let pageIndex = 0;
    pageIndex <
    pageRange.count;
    pageIndex += 1
  ) {
    document.switchToPage(
      pageIndex
    );

    document
      .font(
        "Helvetica"
      )
      .fontSize(8)
      .fillColor("#64748B")
      .text(
        `CampusTE | Offer ID: ${
          offer.offerId
        } | Page ${
          pageIndex + 1
        } of ${
          pageRange.count
        }`,
        pageMargins.left,
        document.page.height -
          38,
        {
          width:
            getContentWidth(
              document
            ),

          align: "center",
          lineBreak: false,
        }
      );
  }
}

export async function generateOfferLetterPdf({
  offer,
  branding = {},
}) {
  await fileSystem.mkdir(
    offerLetterDirectory,
    {
      recursive: true,
    }
  );

  const companyPart =
    createSafeFilePart(
      offer.company
        ?.companyName,
      "Company"
    );

  const candidatePart =
    createSafeFilePart(
      offer.student
        ?.fullName,
      "Candidate"
    );

  const originalFileName =
    `${companyPart}_Offer_Letter_${candidatePart}_${offer.offerId}.pdf`;

  const storedFileName =
    `generated-offer-${
      offer.offerId
    }-${Date.now()}-${crypto.randomUUID()}.pdf`;

  const absoluteFilePath =
    path.join(
      offerLetterDirectory,
      storedFileName
    );

  const relativeFilePath =
    path
      .relative(
        process.cwd(),
        absoluteFilePath
      )
      .split(path.sep)
      .join("/");

  try {
    const document =
      new PDFDocument({
        size: "A4",

        margins:
          pageMargins,

        bufferPages:
          true,

        info: {
          Title:
            `Employment Offer Letter - ${
              offer.designation
            }`,

          Author:
            readText(
              offer.company
                ?.companyName,
              "CampusTE"
            ),

          Subject:
            `Offer ID ${
              offer.offerId
            }`,

          Creator:
            "CampusTE",
        },
      });

    const outputStream =
      fs.createWriteStream(
        absoluteFilePath,
        {
          flags: "wx",
        }
      );

    const completion =
      new Promise(
        (
          resolve,
          reject
        ) => {
          outputStream.on(
            "finish",
            resolve
          );

          outputStream.on(
            "error",
            reject
          );

          document.on(
            "error",
            reject
          );
        }
      );

    document.pipe(
      outputStream
    );

    document.on(
      "pageAdded",
      () => {
        drawContinuationHeader(
          document,
          offer
        );
      }
    );

    drawMainHeader(
      document,
      offer,
      branding
    );

    const generatedDate =
      new Date()
        .toLocaleDateString(
          "en-IN",
          {
            day: "2-digit",
            month: "long",
            year: "numeric",
          }
        );

    document
      .font(
        "Helvetica"
      )
      .fontSize(9.5)
      .fillColor("#64748B")
      .text(
        `Generated: ${generatedDate}`,
        pageMargins.left,
        document.y,
        {
          width:
            getContentWidth(
              document
            ),

          align: "right",
        }
      );

    document
      .font(
        "Helvetica"
      )
      .fontSize(9.5)
      .fillColor("#64748B")
      .text(
        `Reference: CampusTE Offer #${offer.offerId}`,
        pageMargins.left,
        document.y + 4,
        {
          width:
            getContentWidth(
              document
            ),

          align: "right",
        }
      );

    document.moveDown(1.7);

    document
      .font(
        "Helvetica-Bold"
      )
      .fontSize(11)
      .fillColor("#111827")
      .text(
        `Dear ${readText(
          offer.student
            ?.fullName,
          "Candidate"
        )},`,
        pageMargins.left,
        document.y,
        {
          width:
            getContentWidth(
              document
            ),
        }
      );

    document.moveDown(0.9);

    setBodyTextStyle(
      document
    );

    document.text(
      `We are pleased to offer you the position of ${readText(
        offer.designation,
        "the selected position"
      )} at ${readText(
        offer.company
          ?.companyName,
        "our company"
      )}. Based on the recruitment process and the information provided by you, we believe that your skills and experience will be valuable to our organization.`,
      pageMargins.left,
      document.y,
      {
        width:
          getContentWidth(
            document
          ),

        align: "left",
        lineGap: 4,
      }
    );

    document.moveDown(1.5);

    drawOfferDetails(
      document,
      offer
    );

    drawTerms(
      document,
      offer
    );

    drawSignatureSection(
      document,
      offer,
      branding
    );

    addPageFooters(
      document,
      offer
    );

    document.end();

    await completion;

    const fileStatistics =
      await fileSystem.stat(
        absoluteFilePath
      );

    return {
      originalFileName,
      storedFileName,

      mimeType:
        "application/pdf",

      sizeBytes:
        fileStatistics.size,

      filePath:
        relativeFilePath,
    };
  } catch (error) {
    await fileSystem
      .unlink(
        absoluteFilePath
      )
      .catch(() => {});

    throw error;
  }
}