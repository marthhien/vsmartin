// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */

 function activate(context) {
	context.subscriptions.push(   
		vscode.commands.registerCommand(
			'extension.martin', () => {
				// Create and show a new webview
				const panel = vscode.window.createWebviewPanel(
				  'pagehtml', // Identifies the type of the webview. Used internally
				  'Commandes Powershell', // Title of the panel displayed to the user
				  vscode.ViewColumn.One, // Editor column to show the new webview panel in.
				    { 
                                    enableScripts: true
			            } // Webview options. More on these later.
				);

				    // And set its HTML content
					panel.webview.html = getWebviewContent();			

				   // Handle messages from the webview
				       panel.webview.onDidReceiveMessage(
				        message => {
				          switch (message.command) {
				            case 'alert':
				              vscode.window.showInformationMessage(message.text);
				              return;
				          }
				        },
				        undefined,
				        context.subscriptions
				  );  
			  })
			);
  }

  function getWebviewContent() {
	return `<!DOCTYPE html>
  <html lang="en">
  <head>
	  <meta charset="UTF-8">
	  <meta name="viewport" content="width=device-width, initial-scale=1.0">
	  <title>Commandes Powershell</title>

<style type="text/css">

a { text-decoration: none;
    line-height: 1.7; }

a:hover { background: #f0f0f0;
          cursor:default; }

.input0 {
    background-color: #ffffff;
    border-style: solid; 
    border-width: 1px 1px 1px 1px; 
    border-color: #E3E3E3;
    color: #498BA7;
    text-align:left;
    font-face:'Calibri';
    font-size:14px;
    font-weight:bold;
}

.input1 {
    background-color: #ffffff;
    border-style: solid; 
    border-width: 1px 1px 1px 1px; 
    border-color: #E3E3E3;
    color: #498BA7;
    text-align:left;
    font-face:'Calibri';
    font-size:14px;
}

.input2 {
    background-color: #ffffff;
    border-style: solid; 
    border-width: 1px 1px 1px 1px; 
    border-color: #E3E3E3;
    color: #498BA7;
    text-align:left;
    font-face:'Calibri';
    font-size:14px;
}

.textarea1 {
    background-color: #ffffff;
    border-style: solid; 
    border-width: 1px 0px 1px 0px; 
    border-color: #E3E3E3;
    color: #907FC4;
    text-align:left;
    font-face:'Calibri';
    font-size:14px;
    width:1374px;
    height:200px;
}

.div1 { 
    border-width:1px 1px 1px 1px;
    border-style:solid;
    border-color:#e3e3e3;
    position:absolute;
    top:0px;
    left:0px;
    width:2048px;
}

.div2 { 
    border-width:0px 0px 0px 0px;
    border-style:solid;
    border-color:#e3e3e3;
    position:absolute;
    top:0px;
    left:18px;
    width:2048px;
}

</style>

<script type="text/javascript">

const vscode = acquireVsCodeApi();

function Copier() {  

  t = document.getElementById("cmdpwsh");
  selecttxt = '';
  msgtxt = '';
    if (window.getSelection) {
        selecttxt = window.getSelection();
        msgtxt = 'La sélection a été copiée : ' + selecttxt.toString ();
    } else if (document.getSelection) {
        selecttxt = document.getSelection();
        msgtxt = 'La sélection a été copiée : ' + selecttxt.text;
    } else if (document.selection) {
        selecttxt = document.selection.createRange();
        msgtxt = 'La sélection a été copiée : ' + selecttxt.text;
    }
 
    if (selecttxt == '') {
          t.select();
          selecttxt = window.getSelection();
          msgtxt = 'Toutes les lignes ont été copiée : ' + selecttxt.toString ();
    }

  document.execCommand("copy");

  vscode.postMessage({
    command: 'alert',
    text: msgtxt
  });

}

function Fixervaleurdescmd() 
{

n =  new Date();
y = n.getFullYear();
m = n.getMonth() + 1;
if (m < 10) {
  m ='0' + m;
}
d = n.getDate();
if (d < 10) {
  d ='0' + d;
}

s1 = "$Name='" + usr.value + "'";
s2 = "$User = Get-ADUser -Filter 'sAMAccountName -eq $Name'";
s3 = "If ($User -eq $Null) {write-host 'Pas trouvé' -fore red} Else {write-host  'Le compte existe' -fore green}";
document.getElementById("adexist1").innerText = s1;
document.getElementById("adexist2").innerText = s2;
document.getElementById("adexist3").innerText = s3;

s4 = "Get-WmiObject Win32_ComputerSystem  -ComputerName '" + ord.value + "' | select UserName";
s5 = "Enter-PsSession -ComputerName '" + ord.value + "'";
s6 = "Query Session";
s7 = "Reset Session";
s8 = "Get-Volume";
s9 = "(Get-CimInstance Win32_PhysicalMemory | Measure-Object -Property capacity -Sum).sum /1mb";
s10 = "$MaxSize = (Get-PartitionSupportedSize -DriveLetter 'C').sizeMax";
s11 = "Resize-Partition -DriveLetter 'C' -Size $MaxSize";
s12 = "Remove-Partition -Disknumber 0 -PartitionNumber 5";
s13 = "Exit";
document.getElementById("session1").innerText = s4;
document.getElementById("session2").innerText = s5;
document.getElementById("session3").innerText = s6;
document.getElementById("session4").innerText = s7;
document.getElementById("session5").innerText = s8;
document.getElementById("session6").innerText = s9;
document.getElementById("session7").innerText = s10;
document.getElementById("session8").innerText = s11;
document.getElementById("session9").innerText = s12;
document.getElementById("session10").innerText = s13;

s14 = "$compOU = Get-ADComputer -Identity '" + ord.value + "' -Properties CanonicalName";
s15 = "$compOU";
document.getElementById("compou1").innerText = s14;
document.getElementById("compou2").innerText = s15;

s16 = "$userOU = Get-ADUser -Identity '" + usr.value + "' -Properties CanonicalName"; 
s17 = "$userOU"; 
document.getElementById("usrou1").innerText = s16;
document.getElementById("usrou2").innerText = s17;

s18 = "Invoke-Command -ComputerName '" + ord.value + "' -ScriptBlock{Get-LocalGroupMember -Name 'Administrateurs'} | Select-Object -Property Name | Out-GridView"; 
document.getElementById("adm1").innerText = s18;

s19 = "Get-WmiObject Win32_LogicalDisk -ComputerName '" + ord.value + "'"; 
document.getElementById("disk1").innerText = s19;

s20 = "Get-CimInstance -Class CIM_PhysicalMemory -ComputerName '" + ord.value + "' | Select-Object Capacity"; 
document.getElementById("mem1").innerText = s20;

s21 = "Get-WmiObject Win32_UserProfile -Filter 'Special = False' -ComputerName '" + ord.value + "' | select LocalPath";
s22 = "$p = Get-WmiObject Win32_UserProfile -ComputerName '" + ord.value + "' | Where {$_.localpath -eq 'c:/users/" + usr.value + "' }";
s23 = "Remove-WmiObject -InputObject $p";
document.getElementById("profil1").innerText = s21;
document.getElementById("profil2").innerText = s22;
document.getElementById("profil3").innerText = s23;

s24 = "$User1='" + usr.value + "'"; 
s25 = "$User2='Utilisateur2'"; 
s26 = "$MemberOf1 = get-aduser $User1 -Properties MemberOf | Select -ExpandProperty MemberOf "; 
s27 = "$MemberOf2 = get-aduser $User2 -Properties MemberOf | Select -ExpandProperty MemberOf "; 
s28 = "$Compare = Compare-Object $MemberOf1 $MemberOf2 -includeequal"; 
s29 = "$Compare | foreach { $_.InputObject = $_.InputObject.Substring(0, $_.InputObject.IndexOf(','))"; 
s30 = "if ($_.SideIndicator -eq '') {$_.SideIndicator = $User2} }"; 
s31 = "$Compare | Out-GridView"; 
document.getElementById("comp1").innerText = s24;
document.getElementById("comp2").innerText = s25;
document.getElementById("comp3").innerText = s26;
document.getElementById("comp4").innerText = s27;
document.getElementById("comp5").innerText = s28;
document.getElementById("comp6").innerText = s29;
document.getElementById("comp7").innerText = s30;
document.getElementById("comp8").innerText = s31;

s32 = "$KBlist = Get-Hotfix -ComputerName '" + ord.value + "' | Select HotFixID"; 
s33 = "$KBlist | Out-GridView"; 
document.getElementById("kb1").innerText = s32;
document.getElementById("kb2").innerText = s33;

s34 = "Test-Connection -ComputerName '" + ord.value + "'"; 
document.getElementById("ping1").innerText = s34;

s35 = "Enter-PsSession -ComputerName '" + ord.value + "'"; 
s36 = "Get-Process"; 
s37 = "$process = Get-Process | Where-Object { $_.ProcessName -like 'ie4uinit.exe' }"; 
s38 = "foreach($proc in $process){ Stop-Process $proc.Id }"; 
document.getElementById("process1").innerText = s35;
document.getElementById("process2").innerText = s36;
document.getElementById("process3").innerText = s37;
document.getElementById("process4").innerText = s38;

s39 = "Foreach ($i in 651..700) {";
s40 = "$Num = ([string]$i).Padleft(5,'0')";
s41 = "New-ADComputer -Name 'MVDI044-F$num' -SamAccountName 'MVDI044-F$num' -path 'OU=P044-F-ACCESDISTANT,OU=Full_Clone,OU=_Postes,OU=VDI,OU=MIN,DC=MTQ,DC=MIN,DC=INTRA' -Enabled $True";
s42 = "}";
document.getElementById("addad1").innerText = s39;
document.getElementById("addad2").innerText = s40;
document.getElementById("addad3").innerText = s41;
document.getElementById("addad4").innerText = s42;

s43 = "Foreach ($i in 669..671) {";
s44 = "$Num = ([string]$i).Padleft(5,'0')";
s45 = "Set-ADComputer -Identity MVDI044-F$num -Add @{'description'='1545301;Répondant, DGSSRI;repondantDGSSRI;Interne;Réseau;Installé;;Vacant;Environnement VDI;'}";
s46 = "}";
document.getElementById("adddesc1").innerText = s43;
document.getElementById("adddesc2").innerText = s44;
document.getElementById("adddesc3").innerText = s45;
document.getElementById("adddesc4").innerText = s46;

s47 = "Get-ADComputer -Filter * -Properties Name, Description, lastlogontimestamp -SearchBase 'OU=P044-F-ACCESDISTANT,OU=Full_Clone,OU=_Postes,OU=VDI,OU=MIN,DC=MTQ,DC=MIN,DC=INTRA' |Select Name, Description,@{N='lastlogontimestamp'; E={[DateTime]::FromFileTime($_.lastlogontimestamp)}} | Sort-Object Name -Descending| Out-GridView | Get-ADComputer -Filter * -Properties Name, Description, lastlogontimestamp -SearchBase 'OU=P046-F-ACCESDISTANT_DEVL,OU=Full_Clone,OU=_Postes,OU=VDI,OU=MIN,DC=MTQ,DC=MIN,DC=INTRA' |Select Name, Description,@{N='lastlogontimestamp'; E={[DateTime]::FromFileTime($_.lastlogontimestamp)}} | Sort-Object Name -Descending| Out-GridView";
document.getElementById("listevm1").innerText = s47;

s48 = "If (Get-ADComputer -Filter * -Properties * -SearchBase 'OU=P044-F-ACCESDISTANT,OU=Full_Clone,OU=_Postes,OU=VDI,OU=MIN,DC=MTQ,DC=MIN,DC=INTRA'|where-object {$_.Description -like '*" + usr.value + "*'}  -OutVariable Liste) {$Liste | Select-Object CN, Description | Sort-Object CN | Out-GridView} Else{Write-Host 'Aucune VM pour " + usr.value + "' -fore red}";
s49 = "If (Get-ADComputer -Filter * -Properties * -SearchBase 'OU=P046-F-ACCESDISTANT_DEVL,OU=Full_Clone,OU=_Postes,OU=VDI,OU=MIN,DC=MTQ,DC=MIN,DC=INTRA'|where-object {$_.Description -like '*" + usr.value + "*'}  -OutVariable Liste) {$Liste | Select-Object CN, Description | Sort-Object CN | Out-GridView} Else{Write-Host 'Aucune VM pour " + usr.value + "' -fore red}";
document.getElementById("dejavm1").innerText = s48;
document.getElementById("dejavm2").innerText = s49;

s50 = "Get-ADComputer -Filter * -Properties * -SearchBase 'OU=P044-F-ACCESDISTANT,OU=Full_Clone,OU=_Postes,OU=VDI,OU=MIN,DC=MTQ,DC=MIN,DC=INTRA' |where-object {$_.Description -like '*Vacant*'} | Select-Object CN | Sort-Object CN | Out-GridView";
s51 = "Get-ADComputer -Filter * -Properties * -SearchBase 'OU=P046-F-ACCESDISTANT_DEVL,OU=Full_Clone,OU=_Postes,OU=VDI,OU=MIN,DC=MTQ,DC=MIN,DC=INTRA' |where-object {$_.Description -like '*Vacant*'} | Select-Object CN | Sort-Object CN | Out-GridView";
document.getElementById("vacant1").innerText = s50;
document.getElementById("vacant2").innerText = s51;

s52 = "Set-COVIDVM -NT '" + usr.value + "' -Commentaire '" + inc.value + "'";
s53 = "Set-COVIDVM -NT '" + usr.value + "' -Commentaire '" + inc.value + "' -DEV";
s54 = "Set-HorizonVM -NT '" + usr.value + "' -NomVM '" + ord.value + "' -Commentaire '" + inc.value + "'";
s55 = "Set-HorizonVM -NT '" + usr.value + "' -NomVM '" + ord.value + "' -Commentaire '" + inc.value + "' -LocalAdmin";
s56 = "Set-HorizonVM '" + ord.value + "' -Liberer -Rebuild";
s57 = "Set-HorizonVM -NT '" + usr.value + "' -NomVM '" + ord.value + "' -Commentaire '" + inc.value + "' -DateFin '" + y + "-" + m + "-" + d + "' -LocalAdmin";
document.getElementById("setcovid1").innerText = s52;
document.getElementById("setcovid2").innerText = s53;
document.getElementById("setcovid3").innerText = s54;
document.getElementById("setcovid4").innerText = s55;
document.getElementById("setcovid5").innerText = s56;
document.getElementById("setcovid6").innerText = s57;

s58 = "(Get-Module -ListAvailable).path";
document.getElementById("pwsh1").innerText = s58;

document.getElementById("cmdpwsh").value = "Commande Powershell";

}

function Cliquecmd(idcmd) 
{
document.getElementById("cmdpwsh").value = document.getElementById(idcmd).innerText;
document.documentElement.scrollTop = 0;
}

</script>

</head>

<body>

<font face='Calibri'>

<div class='div1' align='left'><div class='div2' align='left'><p style='margin-top=8'></p>

<input type="text" class="input0" id="inc" value="Billet Easyvista" size=190><p style='margin-top=-20'></p>
<input type="text" class="input1" id="usr" value="Utilisateur" size=219><p style='margin-top=-20'></p>
<input type="text" class="input2" id="ord" value="Poste" size=219><p style='margin-top=-20'></p>
<a href="#" onclick="Fixervaleurdescmd()"><u><font color=darkblue size=4>Actualiser</font></u></a><br><br><br>

<textarea class="textarea1" id="cmdpwsh">Commandes Powershell</textarea><br>
<a href="#" onclick="Copier()"><u><font color=darkblue size=4">Copier</font></u></a><br><br><br>
</font><font face='Consolas'>

<font color=darkgreen># Existe dans l'AD ?</font><br><p style='margin-top=-18'></p>
<div id="adexist" onclick="Cliquecmd('adexist')">
<p id="adexist1"></p>
<p id="adexist2"></p>
<p id="adexist3"></p>
</div><br>

<font color=darkgreen># Logged on</font><br><p style='margin-top=-18'></p>
<div id="loggon" onclick="Cliquecmd('loggon')">
<p id="session1"></p>
</div><br>

<font color=darkgreen># PsSession</font><br><p style='margin-top=-18'></p>
<div id="session" onclick="Cliquecmd('session')">
<p id="session2"></p>
<p id="session3"></p>
<p id="session4"></p>
<p id="session5"></p>
<p id="session6"></p>
<p id="session7"></p>
<p id="session8"></p>
<p id="session9"></p>
<p id="session10"></p>
</div><br>

<font color=darkgreen># OU Poste</font><br><p style='margin-top=-18'></p>
<div id="compou" onclick="Cliquecmd('compou')">
<p id="compou1"></p>
<p id="compou2"></p>
</div><br>

<font color=darkgreen># OU Utilisateur</font><br><p style='margin-top=-18'></p>
<div id="usrou" onclick="Cliquecmd('usrou')">
<p id="usrou1"></p>
<p id="usrou2"></p>
</div><br>

<font color=darkgreen># Administrateurs</font><br><p style='margin-top=-18'></p>
<div id="adm" onclick="Cliquecmd('adm')">
<p id="adm1"></p>
</div><br>

<font color=darkgreen># Espace disque</font><br><p style='margin-top=-18'></p>
<div id="disk" onclick="Cliquecmd('disk')">
<p id="disk1"></p>
</div><br>

<font color=darkgreen># Mémoire totale</font><br><p style='margin-top=-18'></p>
<div id="mem" onclick="Cliquecmd('mem')">
<p id="mem1"></p>
</div><br>

<font color=darkgreen># Effacer le profil Windows</font><br><p style='margin-top=-18'></p>
<div id="profil" onclick="Cliquecmd('profil')">
<p id="profil1"></p>
<p id="profil2"></p>
<p id="profil3"></p>
</div><br>

<font color=darkgreen># Comparer les groupes de deux utilisateurs</font><br><p style='margin-top=-18'></p>
<div id="comp" onclick="Cliquecmd('comp')">
<p id="comp1"></p>
<p id="comp2"></p>
<p id="comp3"></p>
<p id="comp4"></p>
<p id="comp5"></p>
<p id="comp6"></p>
<p id="comp7"></p>
<p id="comp8"></p>
</div><br>

<font color=darkgreen># Liste des correctifs</font><br><p style='margin-top=-18'></p>
<div id="kb" onclick="Cliquecmd('kb')">
<p id="kb1"></p>
<p id="kb2"></p>
</div><br>

<font color=darkgreen># Ping</font><br><p style='margin-top=-18'></p>
<div id="ping" onclick="Cliquecmd('ping')">
<p id="ping1"></p>
</div><br>

<font color=darkgreen># Processus</font><br><p style='margin-top=-18'></p>
<div id="process" onclick="Cliquecmd('process')">
<p id="process1"></p>
<p id="process2"></p>
<p id="process3"></p>
<p id="process4"></p>
</div><br>

<font color=darkgreen># Créer les comptes dans l'AD</font><br><p style='margin-top=-18'></p>
<div id="addad" onclick="Cliquecmd('addad')">
<p id="addad1"></p>
<p id="addad2"></p>
<p id="addad3"></p>
<p id="addad4"></p>
</div><br>

<font color=darkgreen># Ajouter la description dans l'AD</font><br><p style='margin-top=-18'></p>
<div id="adddesc" onclick="Cliquecmd('adddesc')">
<p id="adddesc1"></p>
<p id="adddesc2"></p>
<p id="adddesc3"></p>
<p id="adddesc4"></p>
</div><br>

<font color=darkgreen># Liste des VM</font><br><p style='margin-top=-18'></p>
<div id="listevm" onclick="Cliquecmd('listevm')">
<p id="listevm1"></p>
</div><br>

<font color=darkgreen># Déjà un VM ?</font><br><p style='margin-top=-18'></p>
<div id="dejavm" onclick="Cliquecmd('dejavm')">
<p id="dejavm1"></p>
<p id="dejavm2"></p>
</div><br>

<font color=darkgreen># Vacant</font><br><p style='margin-top=-18'></p>
<div id="vacant" onclick="Cliquecmd('vacant')">
<p id="vacant1"></p>
<p id="vacant2"></p>
</div><br>

<font color=darkgreen># Assigner une VM</font><br><p style='margin-top=-18'></p>
<div id="setcovid" onclick="Cliquecmd('setcovid')">
<p id="setcovid1"></p>
<p id="setcovid2"></p>
<p id="setcovid3"></p>
<p id="setcovid4"></p>
<p id="setcovid5"></p>
<p id="setcovid6"></p>
</div><br>

<font color=darkgreen># Modules</font><br><p style='margin-top=-18'></p>
<div id="pwsh" onclick="Cliquecmd('pwsh')">
<p id="pwsh1"></p>
</div><br>

<br>

</font>
</div>
</div>

<script type="text/javascript">Fixervaleurdescmd();</script>

  </body>
  </html>`;
  }

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
