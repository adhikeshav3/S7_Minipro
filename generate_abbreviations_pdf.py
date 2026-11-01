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
        leftMargin=54,
        rightMargin=54,
        topMargin=50,
        bottomMargin=50
    )

    styles = getSampleStyleSheet()

    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=16,
        leading=20,
        alignment=1, # Centered
        textColor=colors.HexColor('#0F172A'),
        spaceAfter=14
    )

    cell_abbr_style = ParagraphStyle(
        'AbbrCell',
        parent=styles['Normal'],
        fontName='Times-Bold',
        fontSize=12,
        leading=16,
        textColor=colors.HexColor('#0F172A')
    )

    cell_desc_style = ParagraphStyle(
        'DescCell',
        parent=styles['Normal'],
        fontName='Times-Roman',
        fontSize=12,
        leading=16,
        textColor=colors.HexColor('#1E293B')
    )

    header_abbr_style = ParagraphStyle(
        'HeadAbbr',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=16,
        textColor=colors.white
    )

    header_desc_style = ParagraphStyle(
        'HeadDesc',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=16,
        textColor=colors.white
    )

    story = []

    story.append(Paragraph("LIST OF ABBREVIATIONS", title_style))
    story.append(HRFlowable(width="100%", thickness=1.2, color=colors.HexColor('#0F172A'), spaceAfter=16, spaceBefore=0))

    abbreviations = [
        ("AI", "Artificial Intelligence"),
        ("API", "Application Programming Interface"),
        ("COE", "Controller of Examinations"),
        ("DBT", "Direct Benefit Transfer"),
        ("DSW", "Dean of Student Welfare"),
        ("ERP", "Enterprise Resource Planning"),
        ("FIFO", "First-In-First-Out"),
        ("FIR", "First Information Report"),
        ("HOD", "Head of the Department"),
        ("ICC", "Internal Complaints Committee"),
        ("IPC", "Indian Penal Code"),
        ("ISO", "International Organization for Standardization"),
        ("NAAC", "National Assessment and Accreditation Council"),
        ("NLP", "Natural Language Processing"),
        ("PIN", "Personal Identification Number"),
        ("SGRC", "Student Grievance Redressal Committee"),
        ("SGRMS", "Student Grievance Redressal Management System"),
        ("SLA", "Service Level Agreement"),
        ("SPA", "Single Page Application"),
        ("UGC", "University Grants Commission"),
        ("UI / UX", "User Interface / User Experience")
    ]

    table_data = [
        [Paragraph("Abbreviation", header_abbr_style), Paragraph("Full Expansion / Meaning", header_desc_style)]
    ]

    for abbr, desc in abbreviations:
        table_data.append([
            Paragraph(abbr, cell_abbr_style),
            Paragraph(desc, cell_desc_style)
        ])

    table = Table(table_data, colWidths=[140, 347])
    table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#0F172A')),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('TOPPADDING', (0, 0), (-1, -1), 6),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
        ('LEFTPADDING', (0, 0), (-1, -1), 10),
        ('RIGHTPADDING', (0, 0), (-1, -1), 10),
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
