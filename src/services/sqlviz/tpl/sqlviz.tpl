digraph name {
  bgcolor = "transparent"
  splines = ortho
  fontname = "Helvetica"
  fontsize = 11

  node [
    fontname = "Helvetica"
    fontsize = 11
    shape = "plaintext"
  ]
   edge [
    fontname = "Helvetica"
    fontsize = 11
  ]

  {% for model in models %}
    {% for relation in model.relations %}
    {{ relation.target }} [label=<
        <TABLE BORDER="0" CELLBORDER="1" CELLSPACING="0" ALIGN="left">
        <TR><TD BGCOLOR="Lavender" COLSPAN="2" CELLPADDING="4" ALIGN="CENTER"
        ><FONT FACE="Helvetica-Bold"
        >{{ relation.target }}</FONT></TD></TR>
        </TABLE>
        >]
    {{ model.name }} -> {{ relation.target }};
    {% endfor %}
  {% endfor %}

  {% for model in models %}
    {{ model.name }} [label=<
    <TABLE BORDER="0" CELLBORDER="1" CELLSPACING="0" align="left">
     <TR><TD BGCOLOR="Lavender" COLSPAN="2" CELLPADDING="4" ALIGN="CENTER"
     ><FONT FACE="Helvetica-Bold"
     >{{ model.name }}</FONT></TD></TR>

    {% if not disable_fields %}
        {% for field in model.fields %}
        <TR><TD ALIGN="LEFT" BGCOLOR="White"
        ><FONT {% if field.blank %}COLOR="#7B7B7B" {% endif %}FACE="Helvetica-Bold">{{ field.name }}</FONT
        ></TD>
        <TD ALIGN="LEFT" BGCOLOR="White"
        ><FONT {% if field.blank %}COLOR="#7B7B7B" {% endif %}FACE="Helvetica-Bold">{{ field.type }}</FONT
        ></TD></TR>
        {% endfor %}
    {% endif %}
    </TABLE>
    >]
  {% endfor %}
}
