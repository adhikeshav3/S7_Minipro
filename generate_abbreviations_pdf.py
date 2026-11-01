import os
import sys
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Table, TableStyle, HRFlowable, Spacer
import pypdf

def generate_abbreviations_pdf():
    pdf_filename = "LIST_OF_ABBREVIATIONS.pdf"
    
    # A4 Dimensions: 595.28 x 841.89 pt
    doc = SimpleDocTemplate(
        pdf_filename,
        pagesize=A4,
        leftMargin=44,
        rightMargin=44,
        topMargin=36,
        bottomMargin=36
    )

    styles = getSampleStyleSheet()

    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=14,
        leading=18,
        alignment=1, # Centered
        textColor=colors.HexColor('#0F172A'),
        spaceAfter=8
    )

    cell_abbr_style = ParagraphStyle(
        'AbbrCell',
        parent=styles['Normal'],
        fontName='Times-Bold',
        fontSize=10.5,
        leading=14,
        textColor=colors.HexColor('#0F172A')
    )

    cell_desc_style = ParagraphStyle(
        'DescCell',
        parent=styles['Normal'],
        fontName='Times-Roman',
        fontSize=10.5,
        leading=14,
        textColor=colors.HexColor('#1E293B')
    )

    cell_role_style = ParagraphStyle(
        'RoleCell',
        parent=styles['Normal'],
        fontName='Times-Roman',
        fontSize=9.5,
        leading=13,
        textColor=colors.HexColor('#475569')
    )

    header_style = ParagraphStyle(
        'HeadStyle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10.5,
        leading=14,
        textColor=colors.white
    )

    story = []

    story.append(Paragraph("LIST OF ABBREVIATIONS USED IN THIS PROJECT", title_style))
    story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor('#0F172A'), spaceAfter=8, spaceBefore=0))

    # All abbreviations strictly from this project's code & modules
    project_abbreviations = [
        ("AI", "Artificial Intelligence", "Autonomous agentic reasoning & decision support"),
        ("NLP", "Natural Language Processing", "Automated text intake and category triage engine"),
        ("SLA", "Service Level Agreement", "Turnaround deadline timer (P1: 24h, P2: 48h, P3: 120h, P4: 240h)"),
        ("UGC", "University Grants Commission", "Statutory Student Grievance Redressal Regulations, 2023"),
        ("SGRC", "Student Grievance Redressal Committee", "Statutory tier-2 institutional standing redressal bench"),
        ("SGRMS", "Student Grievance Redressal Management System", "Central administrative software platform title"),
        ("ICC", "Internal Complaints Committee", "Statutory committee for harassment and anti-ragging petitions"),
        ("COE", "Controller of Examinations", "Designated authority for hall tickets and marksheet anomalies"),
        ("CFO", "Chief Finance Officer", "Authority presiding over fee refunds and reconciliation"),
        ("DSW", "Dean of Student Welfare", "Hostel living standards and campus residential welfare"),
        ("HOD", "Head of the Department", "Tier-1 departmental academic review sub-committee"),
        ("PIN", "Personal Identification Number", "Confidential 4-digit docket tracking security pin"),
        ("ORD", "University Ordinance", "Academic bylaws (e.g., ORD-14B: answer script evaluation)"),
        ("DBT", "Direct Benefit Transfer", "Institutional refund mechanism for caution deposits"),
        ("FIR", "First Information Report", "Statutory criminal escalation for severe ragging offenses"),
        ("IPC", "Indian Penal Code", "Legal penal framework cited in university harassment bylaws"),
        ("API", "Application Programming Interface", "Data exchange between storage service and UI modules"),
        ("SPA", "Single Page Application", "Vite + React client-side portal architecture"),
        ("UI / UX", "User Interface / User Experience", "Simplified accessible student grievance wizard design")
    ]

    table_data = [
        [
            Paragraph("Abbreviation", header_style),
            Paragraph("Full Expansion", header_style),
            Paragraph("Role / Context in this Project", header_style)
        ]
    ]

    for abbr, desc, role in project_abbreviations:
        table_data.append([
            Paragraph(abbr, cell_abbr_style),
            Paragraph(desc, cell_desc_style),
            Paragraph(role, cell_role_style)
        ])

    table = Table(table_data, colWidths=[80, 205, 222])
    table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#0F172A')),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('TOPPADDING', (0, 0), (-1, -1), 3),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 3),
        ('LEFTPADDING', (0, 0), (-1, -1), 6),
        ('RIGHTPADDING', (0, 0), (-1, -1), 6),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#CBD5E1')),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, colors.HexColor('#F8FAFC')])
    ]))

    story.append(table)

    doc.build(story)

    reader = pypdf.PdfReader(pdf_filename)
    total_pages = len(reader.pages)
    print(f"Generated '{pdf_filename}' with {total_pages} page(s).")
    return total_pages

if __name__ == '__main__':
    generate_abbreviations_pdf()
