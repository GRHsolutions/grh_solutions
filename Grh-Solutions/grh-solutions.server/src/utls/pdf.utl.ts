import PDFDocument from "pdfkit";
import Handlebars from "handlebars";

interface PdfBasicInfo {
  title: string;
  author: string;
  subject: string;
  keywords: string;
}

export const pdf = {
  renderFromObjectToTemplate: async (
    obj: object,
    template: string,
    pdfInfo: PdfBasicInfo
  ): Promise<Buffer> => {
    return new Promise((resolve, reject) => {
      try {
        // Compilar plantilla con Handlebars
        const compiledTemplate = Handlebars.compile(template);
        const dataCompiled = compiledTemplate(obj);

        console.info("---------------------------------- data compiled -------------------------------- ")
        console.info(dataCompiled)
        console.info("---------------------------------- end ofdata compiled -------------------------------- ")

        // Crear PDF
        const doc = new PDFDocument({
          info: {
            Title: pdfInfo.title,
            Author: pdfInfo.author,
            Subject: pdfInfo.subject,
            Keywords: pdfInfo.keywords,
          },
        });

        const chunks: Buffer[] = [];

        // Guardar los "pedazos" del PDF en memoria
        doc.on("data", (chunk) => chunks.push(chunk));
        doc.on("end", () => {
          const buffer = Buffer.concat(chunks);
          resolve(buffer);
        });

        // Contenido del PDF
        doc.fontSize(18).text(pdfInfo.title, { align: "center" }).moveDown(2);
        doc.fontSize(12).text(dataCompiled, { align: "justify" });

        doc.end();
      } catch (err) {
        reject(err);
      }
    });
  },
};
