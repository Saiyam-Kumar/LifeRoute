import jsPDF from "jspdf";

export function generateIncidentBrief(prediction) {
  const doc = new jsPDF();

  const hospital = prediction.recommended_hospital;

  let y = 20;

  doc.setFontSize(20);
  doc.text("LifeRoute Incident Response Brief", 20, y);

  y += 15;

  doc.setFontSize(12);
  doc.text(`Generated: ${new Date().toLocaleString()}`, 20, y);

  y += 12;

  doc.text(`Priority (KTAS): ${prediction.ktas_level}`, 20, y);

  y += 10;

  doc.text(`Category: ${prediction.category ?? "General"}`, 20, y);

  y += 15;

  doc.setFontSize(14);
  doc.text("Recommended Hospital", 20, y);

  y += 10;

  doc.setFontSize(12);
  doc.text(`Hospital: ${hospital.hospital}`, 20, y);

  y += 8;

  doc.text(`ETA: ${hospital.eta} minutes`, 20, y);

  y += 8;

  doc.text(
    `Distance: ${hospital.distance_km ?? "N/A"} km`,
    20,
    y
  );

  y += 15;

  doc.setFontSize(14);
  doc.text("Assigned Resources", 20, y);

  y += 10;

  doc.setFontSize(12);

  prediction.resources.forEach((resource) => {
    doc.text(`• ${resource}`, 25, y);
    y += 8;
  });

  y += 5;

  doc.setFontSize(14);
  doc.text("AI Recommendations", 20, y);

  y += 10;

  doc.setFontSize(12);

  prediction.reasons.forEach((reason) => {
    doc.text(`• ${reason}`, 25, y);
    y += 8;
  });

  y += 8;

  doc.setFontSize(14);
  doc.text("Incident Timeline", 20, y);

  y += 10;

  doc.setFontSize(12);

  doc.text("✓ Assessment Submitted", 25, y);

  y += 8;

  doc.text("✓ AI Prediction Completed", 25, y);

  y += 8;

  doc.text("✓ Hospital Recommendation Generated", 25, y);

  y += 8;

  doc.text("✓ Incident Ready", 25, y);

  y += 15;

  doc.setFontSize(10);

  doc.text(
    "Generated automatically by LifeRoute AI",
    20,
    y
  );

  doc.save("LifeRoute_Incident_Response_Brief.pdf");
}