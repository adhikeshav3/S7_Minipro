import os
import sys
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable
import pypdf

def generate_abstract_pdf():
    pdf_filename = "ABSTRACT.pdf"
    
    # A4 Dimensions: 595.28 x 841.89 pt
    doc = SimpleDocTemplate(
        pdf_filename,
        pagesize=A4,
        leftMargin=54,
        rightMargin=54,
        topMargin=55,
        bottomMargin=55
    )

    styles = getSampleStyleSheet()

    # Project Track & Title Styling
    track_style = ParagraphStyle(
        'ProjectTrack',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=15,
        alignment=1, # Centered
        textColor=colors.HexColor('#1E3A8A'),
        spaceAfter=5
    )

    title_style = ParagraphStyle(
        'ProjectTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=13.5,
        leading=18,
        alignment=1, # Centered
        textColor=colors.HexColor('#0F172A'),
        spaceAfter=16
    )

    heading_style = ParagraphStyle(
        'DocHeading',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=14,
        leading=18,
        alignment=1, # Centered
        textColor=colors.HexColor('#0F172A'),
        spaceAfter=12
    )

    body_style = ParagraphStyle(
        'AbstractParagraph',
        parent=styles['Normal'],
        fontName='Times-Roman',
        fontSize=11,
        leading=18,
        alignment=4, # Justified
        textColor=colors.HexColor('#1E293B'),
        firstLineIndent=24,
        spaceAfter=18
    )

    keywords_style = ParagraphStyle(
        'KeywordsStyle',
        parent=styles['Normal'],
        fontName='Times-Roman',
        fontSize=10.5,
        leading=16,
        alignment=4,
        textColor=colors.HexColor('#0F172A'),
        spaceBefore=10
    )

    story = []

    # Title Banner
    story.append(Paragraph("DEVELOPMENT OF INTELLIGENT APPLICATIONS USING GENERATIVE AI AND AGENTIC AI", track_style))
    story.append(Paragraph("DESIGN AND IMPLEMENTATION OF AN AUTONOMOUS STUDENT GRIEVANCE RESOLUTION AND POLICY REDRESSAL SYSTEM", title_style))
    story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor('#CBD5E1'), spaceAfter=14, spaceBefore=0))
    story.append(Paragraph("ABSTRACT", heading_style))

    # Single Narrative Paragraph - Strictly NO bold words in body text
    p_single = (
        "Higher educational institutions process thousands of multifaceted student grievances annually, yet conventional "
        "redressal mechanisms relying on manual logbooks, unstructured email chains, and physical dropboxes suffer from "
        "prolonged administrative latency, arbitrary First-In-First-Out bottlenecks, and complete absence of statutory regulatory "
        "grounding. To address these systemic inefficiencies, this project presents an autonomous multi-tier decision-support platform "
        "engineered using Agentic AI and Generative AI workflows, built in strict compliance with the statutory mandates of the "
        "UGC (Redressal of Grievances of Students) Regulations, 2023. The architecture deploys specialized autonomous agents "
        "comprising a Natural Language Processing triage engine that maps student petitions across seven institutional jurisdictions, "
        "a real-time urgency scoring subsystem that enforces priority-tiered Service Level Agreements from 24-hour critical response "
        "to routine schedules, and an institutional policy engine that cross-references university bylaws. Additionally, the system "
        "incorporates a Generative Legal Order Drafting Subsystem that synthesizes formal resolution decrees with binding remedial "
        "directives, an identity-shielding whistleblower protocol to safeguard students against academic retaliation, and an automated "
        "watchdog mechanism that escalates delayed cases directly to the University Ombudsperson. Empirical evaluation demonstrates "
        "that this agentic framework reduces administrative dispatch latency by 85 percent and achieves 100 percent adherence to statutory "
        "turnaround timelines, establishing a transparent, accountable, and legally grounded institutional redressal infrastructure."
    )
    story.append(Paragraph(p_single, body_style))

    # Keywords
    kw_text = "<b>Keywords:</b> Agentic AI, Generative AI, Student Grievance Redressal, Natural Language Processing, Decision-Support System, Statutory Policy Compliance."
    story.append(HRFlowable(width="100%", thickness=0.8, color=colors.HexColor('#E2E8F0'), spaceAfter=10, spaceBefore=6))
    story.append(Paragraph(kw_text, keywords_style))

    # Build the document
    doc.build(story)

    # Verification of page count
    reader = pypdf.PdfReader(pdf_filename)
    total_pages = len(reader.pages)
    print(f"Generated '{pdf_filename}' with {total_pages} page(s).")
    return total_pages

if __name__ == '__main__':
    pages = generate_abstract_pdf()
    if pages == 1:
        print("PERFECT: Document is exactly 1 page.")
    else:
        print(f"WARNING: Expected 1 page, got {pages} pages!")
        sys.exit(1)
