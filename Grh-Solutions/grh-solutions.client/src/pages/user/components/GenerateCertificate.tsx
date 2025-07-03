import { IOption, Profile } from "../../../domain/models/profile/profile.entities";

export const generateLaborCertificateHTML = (profile: Partial<Profile>, documentType: IOption[]) => {
  const tipoDoc = documentType.find(d => d.value === profile.type_document)?.name || profile.type_document || 'Tipo Documento';
  const nombreCompleto = `${profile.name || 'Nombres'} ${profile.lastname || 'Apellidos'}`;
  const numeroDocumento = profile.document || 'XXXXXXXXX';
  const fechaIngreso = profile.date_application?.split('T')[0] || 'fecha de ingreso';
  const cargo = profile.vacancy_name || 'Cargo';
  const tipoContrato = profile.status || 'Tipo de contrato';
  const direccion = profile.address || 'Dirección no registrada';
  const telefono = profile.telephone || '---';
  const celular = profile.number_phone || '---';
  const correo = profile.email || '---';
  const rh = profile.rh || '--';
  const fechaNacimiento = profile.date_of_birth?.split('T')[0] || '---';

  return `
    <div style="font-family: Arial, sans-serif; padding: 20px; color: #000;">
      <h2 style="text-align: center;">CERTIFICADO LABORAL</h2>

      <p>Quien suscribe, en calidad de representante legal de la empresa <strong>DISOLIN S.A.S</strong>, con domicilio en la ciudad de Bogotá D.C., certifica que:</p>

      <p><strong>${nombreCompleto}</strong>, identificado(a) con ${tipoDoc} No. <strong>${numeroDocumento}</strong>, nacido(a) el día <strong>${fechaNacimiento}</strong>, labora actualmente en nuestra organización desde el día <strong>${fechaIngreso}</strong>, desempeñando el cargo de <strong>${cargo}</strong>.</p>

      <p>El colaborador se encuentra vinculado(a) mediante contrato de trabajo de tipo <strong>${tipoContrato}</strong>, cumpliendo satisfactoriamente con sus funciones asignadas.</p>

      <p>Información de contacto del colaborador:</p>
      <ul>
        <li><strong>Dirección:</strong> ${direccion}</li>
        <li><strong>Teléfono fijo:</strong> ${telefono}</li>
        <li><strong>Celular:</strong> ${celular}</li>
        <li><strong>Correo electrónico:</strong> ${correo}</li>
        <li><strong>RH:</strong> ${rh}</li>
      </ul>

      <p>Este certificado se expide a solicitud del interesado y para los fines que estime convenientes.</p>

      <br /><br />

      <p>Cordialmente,</p>
      <br /><br />
      <p><strong>Representante Legal</strong></p>
      <p><strong>DISOLIN S.A.S</strong></p>
    </div>
  `;
};
