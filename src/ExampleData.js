/**
 * Created by david on 10.03.17.
 */

export let data =
{
    settings: { theme: 'light'},
    news:[{
        name: "Heise Online",
        url: "heise.de",
        id: "heise",
        articles: [{
            title:   'Reaktionen auf Vault 7 von Wikileaks: Fake-Hacks und sichere Verschlüsselung',
            date: '09.03.2017',
            teaser:  'Die Wikileaks-Veröffentlichungen von CIA-Dokumenten werden politisch verwertet.'+
            ' Rechte und Verschwörungstheoretiker in den USA sehen den Beweis, dass die CIA den' +
            ' Wahlkampf beeinflusst hat. IT-Firmen versichern derweil, dass ihre Produkte sicher sind.',
            img:     './img/example.jpg',
            content: 'Nach der von Wikileaks betriebenen Veröffentlichung eines CIA-Wikis betonen IT-Firmen wie Apple oder Open Whisper Systems (Signal), dass ihre Geräte beziehungsweise Anwendungen sicher sind. Angesichts der Enthüllungen darüber, wie CIA-Programmierer Schwachstellen ausnutzen, Geräte hacken und Spuren verwischen, trumpft die US-amerikanische Alt-Right-Bewegung auf: Vault 7 beweise, dass die "russischen Hacker" CIA-Leute sind und somit der "tiefe Staat" im Wahlkampf versucht habe, Donald Trump russische Kontakte anzudichten.' +
            'Material für Verschwörungstheorien' +
            'Noch steht die Auswertung der von Wikileaks veröffentlichten CIA-Dokumente ganz am Anfang, doch bereits jetzt zeichnet sich ab, dass das Material politisch genutzt wird. So hat Milo Yiannopoulis, ein Vordenker der Alt-Right-Bewegung eine Zusammenfassung von Vault 7 veröffentlicht, die die Gefährlichkeit der CIA zeigen soll. Noch weiter geht der Verschwörungstheoretiker Alex Jones, der auf seiner Infowars-Seite das CIA-Projekt Umbrage als Beweis wertet, dass CIA-Programmierer Cyber-Angriffe so getarnt haben, dass sie als Werk russischer Hacker erschienen. Die Schlussfolgerung daraus: Die CIA produziert russische Fake-Hacks, um Trump zu schaden. Auf diese Weise manifestiere sich der "tiefe Staat", der Trump bei allen Schritten behindere.'+
            'In diesem Sinne wäre das Timing von Wikileaks, das lang angekündigte Vault-Material jetzt zu veröffentlichen, ein Unterstützungsversuch für Trump. Für Wikileaks-Chef Julian Assange scheint der Fokus auf einem anderen Staat zu liegen. Bereits in der Einleitung der Pressemitteilung über Vault 7 wird auf die zuvor veröffentlichten Papiere verwiesen, nach denen die CIA die französischen Wahlen anno 2012 beeinflusst haben soll. In dieser Lesart könnten die jüngst beklagten Cyber-Angriffe russischer Hacker in Frankreich ebenfalls dem US-Auslandsgeheimdienst zugeordnet ("attribuiert") werden, deutet die Pressemitteilung an.' +
            'Einige Firmen, die in den Vault 7-Dokumenten genannt werden, haben bereits auf die Veröffentlichung reagiert. Apple erklärte, dass die meisten in Vault 7 genannten Schwachstellen und Sicherheitslücken von Apple bereits geschlossen worden seien. Open Whisper Systems, die Firma, die für Whatsapp und Signal die Verschlüsselungskomponente liefert, meldete sich per Twitter zu Wort: Die Dokumente lieferten keine Informationen, dass die Verschlüsselung unsicher sei. Vielmehr versuche die CIA-Malware, sich auf Smartphones zu installieren, um vor oder nach der Entschlüsselung Informationen abzufangen. So gesehen sei die Verschlüsselungstechnik insgesamt erfolgreich, weil sie den Geheimdienst dazu zwinge, riskante Aktionen durchzuführen, die entdeckt werden können.'+
            'Ruf nach Regeln für IT-Sicherheit'+
            'In einer der ersten deutschen Reaktionen hat der Grünen-Politiker Konstantin von Notz im ARD-Morgenmagazin "rechtsstaatliche Regeln für IT-Sicherheit" gefordert. Die CIA-Dokumente zeigten, dass es "Hintertüren in unser aller Kommunikationswelt" gebe. Doch dies sei nicht allein ein Werk der CIA: "Diese Dinge werden natürlich auch von russischen Diensten gemacht, aber auch von deutschen Diensten." Im Falle von Terrorismus-Abwehr könne IT-Spionage legitim sein, doch 90 Prozent der Geheimdienstarbeit befasse sich mit anderen Zielen, erklärte von Notz.'
        },{
            title: 'Kommentar: Wenn die Künstlichen Intelligenzen Einstein und Watson sich paaren, finden User sich in einem Alptraum wieder',
            date: '10.03.2017',
            teaser: 'Künstliche Intelligenz verspricht Erkenntnisse, die man mit herkömmlichen Rechenverfahren nie erzielen könnte. Voraussetzung sind gewaltige Datenmengen, deren Gebrauch sich kaum kontrollieren lässt.',
            content: 'Wir haben uns längst daran gewöhnt: Heutige Bestellungen bei Amazon sind die Basis morgiger Kaufempfehlungen. Amazon erarbeitet diese gezielte Werbung mit Machine Learning und künstlicher Intelligenz und verspricht sich davon gewaltige Umsatzchancen.'+
                'Einstein und Watson'+
                'Ähnliche Techniken wie Amazon hat auch Salesforce entwickelt. Dessen KI-Maschine "Einstein" soll aber nicht nur dem Erfinder zur Hand gehen, sondern auch anderen Firmen mit autonomen Schlussfolgerungen beim Vertrieb helfen. Mit dem Einstein-API könnten Entwickler zum Beispiel eine App programmieren, die ausgewählten Adressaten angesichts heruntergeladener Strandfotos und niedriger Hypothekenzinsen automatisch den Kauf einer Finca auf Mallorca empfiehlt.'+
                'Die wohl bekannteste KI-Software, IBMs Watson, machte bislang nur in Großprojekten wie dem Jeopardy-Wettbewerb sporadisch von sich Reden, doch jetzt kooperiert IBM mit Salesforce, um Einstein und Watson im Team einzusetzen. Salesforce-Entwickler sollen damit auch die Intelligenz – und vor allem das gesammelte Wissen – von Watson als Entscheidungsgrundlage nutzen können.'+
                'Mir macht das Angst'+
                'OK – Werbung mit Bezug auf meine persönlichen Interessen nervt mich immer noch weniger als die allgegenwärtige Haarspray-Reklame. Aber müssen die Nintendos und L`Oreals dieser Welt wirklich alles über mich wissen? Ich finde: Nein, und schon deshalb ist mir die Datenvereinigung von Salesforce und IBM suspekt. Watson und Einstein zusammen sind ein Alptraum-Team.'+
                'Was ich meinem Salesforce-nutzenden Händler über mich verraten habe, bliebe in einer anständigen Welt ohne KI auf dessen eigene Verwendung beschränkt. Mit dieser Illusion könnte ich mich noch abfinden. Doch wenn dieses personenbezogene Wissen mehr oder weniger wirksam anonymisiert allen Salesforce-Nutzern und auch den Nutzern der Watson-Engine zur Verfügung steht, werde ich durchsichtig sogar für Firmen, mit denen ich nie zu tun hatte. Keine Datenschutzbestimmung schützt mich gegen die Weitergabe aggregierter Daten, wie sie ein neuronales Netz zugänglich macht. Ich kann auch niemanden zur Rechenschaft ziehen, wenn bei der Korrelation vieler scheinbar anonymer Datensätze wie aus dem Nichts mein lückenloses Verbraucherprofil materialisiert.'+
                'Schlimmer noch: Ich kann dieses Profil nicht einmal korrigieren, wenn es auf falschen Annahmen beruht. Wenn ein neuronales Netz Milliarden von Eingangsdaten miteinander verknüpft und daraus eine Aussage ableitet, ist kaum objektivierbar, welche Informationen maßgeblich zum Ergebnis beigetragen haben. Der Fragesteller muss das Ergebnis ohne Kontrollmöglichkeit hinnehmen.'+
                'Demnächst in diesem Theater'+
                'Glaubt man den Protagonisten der Technik, drohen zumindest vorerst keine fatalen Fehlentscheidungen. Momentan planen die Anbieter den Einsatz der KI nur für nicht kritische Szenarien wie das Customer Relationship Management. Doch ist es kein großer Schritt mehr, bis die Entscheidungsgrundlage eines künstlich intelligenten CRM-Systems auch die Hüter nationaler Sicherheiten lockt. Wohin das führen kann, sieht man heute in düsteren Science-Fiction-Filmen – und morgen vielleicht in diesem Theater.'
        }]
    },{
        name: "Spiegel Online",
        url: "spiegel-online.de",
        id: "spo",
        articles:[{
            title: 'Angriff am Düsseldorfer Hauptbahnhof Tatverdächtiger im Krankenhaus - Axt sichergestellt',
            date: '09.03.2017',
            teaser: 'Am Düsseldorfer Hauptbahnhof sind bei einem Angriff mehrere Menschen verletzt worden. Der Täter '+
            'soll Reisende mit einer Axt angegriffen haben. Die Polizei nahm drei Personen fest, eine steht unter klarem Tatverdacht.',
            content: 'Mehrere Menschen sind am Donnerstagabend am Düsseldorfer Hauptbahnhof bei einem Axt-Angriff verletzt worden. Die Polizei ist mit einem Großaufgebot im Einsatz, ein klar tatverdächtiger Mann konnte festgenommen werden.'+
            'Die Polizei überprüft noch zwei weitere Personen. Sie seien festgenommen worden, weil sie sich verdächtig gemacht hätten, erläuterte eine Polizeisprecherin. Es sei jedoch völlig offen, ob sie etwas mit dem blutigen Angriff zu tun hatten.'+
            'Nach SPIEGEL-Informationen hat der Tatverdächtige zunächst zwei Menschen in einer S-Bahn angegriffen und ist dann am Hauptbahnhof ausgestiegen. Am Bahnsteig attackierte er weitere Passanten. Anschließend flüchtete er und sprang von einer Eisenbahnbrücke. Dabei verletzte er sich schwer, er liegt im Krankenhaus. Die Polizei konnte den Täter anschließend festnehmen, ihn aber noch nicht identifizieren. Laut Polizeiangaben wurde eine Axt sichergestellt.'+
            'Der Bahnhof wurde weiträumig abgesperrt und wird durchsucht. Spezialeinheiten sind ebenfalls im Einsatz.'+
            'SPIEGEL-Reporter Fidelius Schmid berichtete zuvor von Verletzten, die am Hauptbahnhof blutend am Boden lagen. Passanten hatten ihm berichtet, jemand habe angefangen mit der Axt in der Bahn auf Menschen einzuschlagen.'
        }]
    }]
};