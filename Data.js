const CF="https://d3sax14uoqq17.cloudfront.net/",SA="https://dxbhsrqyrr690.cloudfront.net/sidearm.nextgen.sites/iuhoosiers.com/";
const IU_LOGO="images/iu-altius-logo.jpg";
const img=u=>u;
const NEWS=[
{id:1,title:"Fall Baseball News and Notes",date:"Sep 9, 2026",img:CF+"images/2026/9/9/20260901_BAPractice_LMD_0733.jpg",blurb:"A look at how fall practice is shaping up for the Hoosiers as the roster gets its first live look at the 2027 squad."},
{id:2,title:"Schedule Announced for Spartanburg College Baseball Series",date:"Sep 21, 2026",img:CF+"images/2026/9/15/20260418_BA_AbileneChristian_BBH_1857.jpg",blurb:"Indiana opens the 2027 season at the Spartanburg College Baseball Series in South Carolina, facing UNCW, Wofford and Austin Peay."},
{id:3,title:"'Boo at the Bart' Coming Back to Bloomington",date:"Sep 18, 2026",img:CF+"images/2026/9/16/20251026_BA_BooAtTheBart_0042.jpg",blurb:"IU Baseball's annual Halloween fan event returns to Bart Kaufman Field with games, costumes and autographs for Hoosier families."},
{id:4,title:"Parker Named One of Nation's Top Newcomers",date:"Sep 1, 2026",img:CF+"images/2026/8/25/DTW_9576.JPG",blurb:"Freshman infielder Jayden Parker was recognized on a national preseason newcomer watch list heading into his first fall camp."},
{id:5,title:"Fall Newcomer Numbers, Additions Unveiled",date:"Aug 26, 2026",img:CF+"images/2026/8/25/20260426_BA_Iowa_PLD_0022.jpg",blurb:"The Hoosiers officially welcomed their incoming freshman and transfer class, assigning jersey numbers for fall workouts."},
{id:6,title:"Hoosiers Announce Fall Ball Schedule",date:"Aug 21, 2026",img:CF+"images/2026/8/20/20260414_BA_IndianaState_BBH_1257.jpg",blurb:"Indiana released its slate of fall scrimmages and intrasquad games at Bart Kaufman Field ahead of the 2027 spring season."}];
const VIDS=[{id:1,title:"Jacksonville Baseball Classic - Notre Dame Press Conference",date:"Feb 22",thumb:"2026/2/22/iub-d97cca38-dcf1-443f-8a70-30fd07777f09.jpg"},
{id:2,title:"Jacksonville Baseball Classic - UCF Press Conference",date:"Feb 21",thumb:"2026/2/21/iub-96baa403-1cec-4279-bd31-78d0f3a72ba9.jpg"},
{id:3,title:"Jacksonville Baseball Classic - LSU Press Conference",date:"Feb 20",thumb:"2026/2/20/iub-bf1cfe7a-d64b-4646-8caa-64162d7775e6.jpg"},
{id:4,title:"Big Ten Tournament Press Conference - vs. Rutgers",date:"May 21",thumb:"2025/5/21/iub-37e1d3ef-b7f1-4927-8b12-1c0004426c1c.jpg"}];
const RESULTS=[];
const STANDINGS=[];
const SUPPORTED_SEASONS=["2026-27","2025-26"];
const SCH=[["UNCW","UNCW_.png","vs","Spartanburg, S.C.","1:30 p.m.",["Feb 26 (Fri)"],0,"Spartanburg College Baseball Series"],
["Wofford","Wofford.png","vs","Spartanburg, S.C.","6 p.m.",["Feb 27 (Sat)"],0,"Spartanburg College Baseball Series"],
["Austin Peay","Austin-Peay.png","vs","Spartanburg, S.C.","10:30 a.m.",["Feb 28 (Sun)"],0,"Spartanburg College Baseball Series"],
["Nebraska","Nebraska_200x200.png","vs","Bloomington, Ind.","TBD",["Mar 19 (Fri)","Mar 20 (Sat)","Mar 21 (Sun)"],1,"Big Ten"],
["Rutgers","Rutgers.png","at","Piscataway, N.J.","TBD",["Mar 26 (Fri)","Mar 27 (Sat)","Mar 28 (Sun)"],1,"Big Ten"],
["Minnesota","Minnesota-200.png","at","Minneapolis, Minn.","TBD",["Apr 2 (Fri)","Apr 3 (Sat)","Apr 4 (Sun)"],1,"Big Ten"],
["Oregon","oregon.png","vs","Bloomington, Ind.","TBD",["Apr 9 (Fri)","Apr 10 (Sat)","Apr 11 (Sun)"],1,"Big Ten"],
["Penn State","Penn-State.png","vs","Bloomington, Ind.","TBD",["Apr 16 (Fri)","Apr 17 (Sat)","Apr 18 (Sun)"],1,"Big Ten"],
["USC","usc-primary-200x200.png","at","Los Angeles, Calif.","TBD",["Apr 23 (Fri)","Apr 24 (Sat)","Apr 25 (Sun)"],1,"Big Ten"],
["Purdue","purdue_200x200.png","vs","Bloomington, Ind.","TBD",["Apr 30 (Fri)","May 1 (Sat)","May 2 (Sun)"],1,"Big Ten"],
["Michigan State","Michigan-State.png","at","East Lansing, Mich.","TBD",["May 7 (Fri)","May 8 (Sat)","May 9 (Sun)"],1,"Big Ten"],
["Ohio State","ohio_state_logo.png","at","Columbus, Ohio","TBD",["May 14 (Fri)","May 15 (Sat)","May 16 (Sun)"],1,"Big Ten"],
["Maryland","Maryland_Terps.png","vs","Bloomington, Ind.","TBD",["May 20 (Thu)","May 21 (Fri)","May 22 (Sat)"],1,"Big Ten"]];
// num|name|pos|yr|ht|wt|bt|hometown|school|prev|id
let ROSTER=`2|Hogan Denny|C/OF|Jr.|6' 0''|220|R/R|Mooresville, Ind.|Mooresville||21376
3|Cal Gates|OF|So.|5' 10''|190|L/L|Bedford, Ind.|Bedford North Lawrence||21379
4|Will Moore|INF|Jr.|5' 9''|180|L/R|Paris, Ontario|Paris District||21383
5|Luke Crighton|RHP|Fr.|6' 4''|185|R/R|Rochester Hills, Mich.|Orchard Lake St. Mary's Prep||21390
6|Eli Walker|RHP|6th|6' 0''|208|R/R|Gulfport, Miss.|Gulfport|Mississippi State|21388
8|Jayden Parker|INF|Fr.|6' 4''|215|R/R|San Diego, Calif.|University City||21391
9|Aiden Reynolds|INF|Fr.|6' 1''|205|R/R|Noblesville, Ind.|Noblesville||21392
10|Kelvyn Paulino Jr.|INF|So.|6' 0''|175|R/R|Thomasville, N.C.|IMG Academy (Fla.)|Florida State|21393
11|Nate Eisfelder|OF|So.|6' 3''|215|R/R|Johnson City, Tenn.|IMG Academy (Fla.)|Tennessee|21394
12|Branson Crawford|C|Fr.|5' 9''|176|R/R|Gainesville, Ga.|North Hall||21395
13|Ryan Maggy|INF|R-So.|6' 2''|210|L/R|Peru, N.Y.|Cypress Creek (Fla.)|West Virginia|21396
14|Brayton Thomas|LHP|Jr.|6' 5''|239|L/L|Fort Wayne, Ind.|Bishop Dwenger||21385
15|Ethan Lyke|LHP|Gr.|5' 11''|185|L/L|Evansville, Ind.|Evansville Central|Murray State|21397
16|Peter Dubie|RHP|Gr.|6' 4''|227|R/R|Indianapolis, Ind.|Park Tudor|Brown|21398
17|Owen Sullivan|RHP|Sr.|6' 4''|185|L/R|Methuen, Mass.|Methuen|Anna Maria College|21399
18|Ivan Mastalski|RHP|So.|6' 4''|227|R/R|Saint John, Ind.|Andrean||21381
19|Cole Decker|OF|Jr.|5' 10''|185|L/R|Evansville, Ind.|Evansville North||21375
20|Logan Cotton|RHP|R-Fr.|6' 4''|210|R/R|Crown Point, Ind.|Crown Point||21374
21|Jacob Vogel|RHP|R-Sr.|6' 7''|260|R/R|North Vernon, Ind.|Jennings County||21386
23|Johnson Dubose|INF|Fr.|6' 3''|200|R/R|Atlanta, Ga.|IMG Academy (Fla.)||21400
24|Luke Teschke|RHP|R-So.|6' 2''|210|R/R|Monticello, Ill.|Monticello|Illinois State|21401
25|Landen Fry|INF|So.|6' 0''|210|R/R|Fort Wayne, Ind.|Snider||21378
26|Owen ten Oever|C|So.|6' 1''|228|R/R|Brooklyn, N.Y.|Poly Prep||21384
27|Cade Pilgrim|LHP|Jr.|5' 10''|185|R/L|Clover, S.C.|Lewisville|Gaston College|21402
29|Kadyn Armitage|INF|Fr.|6' 0''|180|R/R|Surrey, British Columbia|Foothills Composite||21403
30|Blane Metz|RHP|R-Fr.|6' 3''|230|R/R|Floyds Knobs, Ind.|Floyd Central||21382
31|Jake Winger|INF|Fr.|6' 5''|215|R/R|Lafayette, Ind.|McCutcheon||21404
32|Collin Marcum|RHP|Fr.|6' 3''|200|R/R|Bloomington, Ind.|Bloomington South||21405
34|Jaxon Lueken|RHP|Fr.|6' 3''|205|R/R|Huntingburg, Ind.|Forest Park||21406
35|Dylan Kassab|C|Fr.|6' 0''|207|R/R|Hinsdale, Ill.|Hinsdale Central||21407
36|Miles Mador|C|So.|6' 0''|210|R/R|Atlanta, Ga.|Pace Academy||21380
37|Bryce Pauly|INF|Fr.|6' 1''|190|R/R|Davenport, Iowa|Davenport North||21408
38|Jackson Yarberry|RHP|Sr.|6' 3''|215|R/R|Lake St. Louis, Mo.|Timberland|Saint Louis|21389
39|Nash Wagner|RHP|R-So.|6' 5''|227|R/R|Zionsville, Ind.|Zionsville|Alabama|21387
43|Finn Hoeschen|OF|Fr.|6' 3''|205|L/R|North Vancouver, British Columbia|Carson Graham||21410
44|Liam Amoriello|LHP|Fr.|5' 11''|165|L/L|Tampa, Fla.|Tampa Jesuit||21411
45|Luca Sandrella|RHP|Jr.|6' 5''|215|R/R|Louisville, Ky.|Christian Education Consortium|IU Southeast|21412
51|Logan Johnston|RHP|Fr.|6' 5''|190|R/R|Crown Point, Ind.|Crown Point||21413
55|Kellen English|RHP|So.|6' 10''|230|R/R|Evansville, Ind.|Evansville North||21377`.split("\n").map(l=>l.split("|"));
// Player photo URLs are loaded from Roster.json; empty entries use the IU logo.
const PHOTOS={};
PHOTOS["21376"]="images/players/denny.png";
PHOTOS["21379"]="images/players/gates.png";
PHOTOS["21383"]="images/players/moore.png";
PHOTOS["21385"]="images/players/thomas.png";
PHOTOS["21381"]="images/players/ivan.png";
PHOTOS["21375"]="images/players/decker.png";
PHOTOS["21374"]="images/players/cotton.png";
PHOTOS["21386"]="images/players/vogel.png";
const COACHES=[["Jeff Mercer","Head Coach","jeff-mercer/4418","22-Mercer.jpg","2026/1/13","(812) 855-9155","jeffmerc@iu.edu"],
["Zach Weatherford","Assistant Coach/Hitting & Recruiting Coordinator","zach-weatherford/4419","1-Weatherford.jpg","2026/1/13","(812) 855-9155","zweathe@iu.edu"],
["Matt Myers","Assistant Coach/Pitching","matt-myers/4420","12-Myers.jpg","2026/1/14","(812) 855-9155","myers63@iu.edu"],
["Matt Morrow","Assistant Coach/Hitting & Infield","matt-morrow/4448","Morrow.jpg","2026/7/28","(812) 855-9155","mamorro@iu.edu"],
["Sean Mullen","Assistant Coach/Pitching & Catching","sean-mullen/4449","Mullen.jpg","2026/7/28","(812) 855-9155","mullensm@iu.edu"]];
const COACH_PROFILES={
 "jeff-mercer/4418":{
  bio:[
   "Jeff Mercer wrapped up his eighth season as Indiana's head coach following the 2026 campaign. He continues to build the program through high-level high-school talent, transfer-portal evaluation and player development. In his first eight seasons, IU recorded 230-180-1 overall, won 109 Big Ten games, made five Big Ten Tournaments and three NCAA Regionals, and had 31 unique players selected in the MLB Draft. Indiana has won one Big Ten championship under Mercer and produced four All-Americans.",
   "Mercer led Indiana to the 2019 Big Ten regular-season championship in his first season, becoming the first Big Ten head coach since 1982 to win the regular-season title in his first year. Indiana earned the No. 2 seed in the NCAA Louisville Regional and finished 37-23 (17-7 Big Ten). Mercer was named Big Ten Coach of the Year. A school-record 10 Hoosiers were selected in the 2019 MLB Draft, led by second-round pick Matt Gorski; Andrew Saalfrank was Big Ten Pitcher of the Year.",
   "In 2026, Indiana finished 23-31 (9-21 Big Ten) with a young lineup; the top eight hitters were freshmen or sophomores. Hogan Denny, Jake Hanley and Caleb Koskie each hit .335 or better and combined for 200 hits, 34 home runs, 43 doubles and 134 RBIs. Denny earned First Team All-Big Ten and ABCA Second Team All-Midwest honors, while Hanley was Second Team All-Big Ten and Tony Neubeck earned third-team recognition. The Hoosiers hit 66 home runs and 92 doubles.",
   "Indiana went 32-24 (16-14) in 2025 and reached the Big Ten Tournament. Jake Hanley became Mercer's second Big Ten Freshman of the Year and a unanimous Freshman All-American. Devin Taylor finished his IU career with a program-record 54 home runs, 229 hits and 179 RBIs. Taylor and Korbyn Dickerson combined for 37 home runs and more than 130 RBIs; Taylor was selected in the second round of the MLB Draft.",
   "In 2024, Indiana went 33-26-1 (15-9), reached the Big Ten Tournament semifinals and the NCAA Knoxville Regional. The Hoosiers led the Big Ten in hits (625), RBIs (451), total bases (1,030), runs (482) and doubles (140), and hit 83 home runs. In 2023, Mercer led IU to 43 wins, a second-place Big Ten finish and the NCAA Lexington Regional final. The 43 wins were the most since 2013; IU had the Big Ten's highest RPI (No. 31) and most Quad 1 wins (10), and set a program record with 26 home wins at Bart Kaufman Field. Devin Taylor was Big Ten Freshman of the Year, while Luke Sinnard set Indiana's single-season strikeout record with 109.",
   "The 2022 Hoosiers reached the Big Ten Tournament semifinals. Freshmen Carter Mathison, Josh Pyne and Brock Tibbitts earned Freshman All-America honors; Mathison set Indiana's freshman home-run record with 19 and drove in 58 runs. In 2021, Indiana went 26-18 in the conference-only season, setting a school record with 26 Big Ten wins; four Hoosiers were selected in the first 10 rounds of the MLB Draft. The 2020 team started 9-6, including three road wins over ranked teams, before its season was canceled due to COVID-19.",
   "Before Indiana, Mercer was an assistant coach at Wright State from 2014-16 and head coach from 2017-18. He was part of three Horizon League regular-season and tournament titles, three NCAA appearances and a 199-92 combined record as an assistant and head coach. As head coach, he led the Raiders to 77 wins, the 2018 Horizon League title and the NCAA Stanford Regional, earning 2018 Horizon League Coach of the Year. Wright State finished 39-17 (22-6) in 2018; the team ranked eighth nationally in runs per game and stolen bases. The 2017 team went 38-21, earned the program's first national ranking, and ranked second nationally with 130 stolen bases.",
   "Mercer's earlier coaching stops included volunteer assistant positions at Western Kentucky (2012-13) and Michigan (2011), and a graduate assistant role at Ohio Northern (2010). At Western Kentucky, he worked with pitchers and outfielders; at Michigan, with catchers and outfielders; at Ohio Northern, he coached infielders and hitters and coordinated recruiting.",
   "As a player, Mercer began at Dayton before transferring to Wright State. He was a two-time First Team All-Horizon League first baseman and a 2009 Third Team All-American, hitting .357 with 26 doubles and 74 RBIs. He was the 2009 Horizon League Player of the Year and helped Wright State reach the NCAA Fort Worth Regional. Mercer earned a degree in organizational leadership from Wright State in 2009. His father, Jeff Sr., was an IU assistant coach in 1988-89 and helped found the Indiana Bulls. Jeff and his wife Stephanie have a son, Grady, and a daughter, Grace."
  ],
  journey:["2019–Present — Indiana (Head Coach)","2017–2018 — Wright State (Head Coach)","2014–2016 — Wright State (Assistant Coach)","2012–2013 — Western Kentucky (Volunteer Assistant)","2011 — Michigan (Volunteer Assistant)","2010 — Ohio Northern (Graduate Assistant)"]
 },
 "zach-weatherford/4419":{
  bio:[
   "Zach Weatherford completed his fourth year as a full-time assistant coach and his fifth season on staff during the 2026 campaign. He added recruiting coordinator responsibilities in August 2024 and works with Indiana's outfielders and baserunners.",
   "A Gold Glove outfielder at Wright State, Weatherford also assists head coach Jeff Mercer with hitters and offensive strategy. He coaches third base and prepares scouting reports on opponents.",
   "In 2026, Hogan Denny earned First Team All-Big Ten honors. Cole Decker and Caleb Koskie combined for 109 hits, while Indiana finished with 515 hits, 92 doubles, 66 home runs, 330 RBIs, 261 walks and 45 stolen bases.",
   "In 2025, Indiana led the Big Ten with a .298 batting average, .418 on-base percentage and 8.2 runs per game. Korbyn Dickerson hit 19 home runs and drove in 77 runs; Will Moore reached base at a .514 clip. Indiana also won 83 games and led the conference in several offensive categories during 2024.",
   "Weatherford helped develop Devin Taylor, the 2023 Big Ten Freshman of the Year, and was part of Wright State's 2021 NCAA regional team as Director of Operations. As a player, he won the 2019 NCAA Rawlings Division I Gold Glove and signed with Cleveland after college."
  ],
  journey:["2022–Present — Indiana (Assistant Coach; Recruiting Coordinator; Outfield and Baserunning)","2021 — Wright State (Director of Operations)","2019 — Wright State (Player; NCAA Rawlings Division I Gold Glove)"]
 },
 "matt-myers/4420":{
  bio:[
   "Matt Myers, a longtime leader at the collegiate and professional level, was announced as Indiana's pitching coach on December 19, 2025. He took over the staff after Dustin Glant left for professional baseball and completed his first season at IU in 2026.",
   "Despite losing Jackson Bergman after three starts, Myers helped the Hoosiers find consistency in the weekend rotation. Tony Neubeck earned Third Team All-Big Ten honors and finished 7-4 with a 3.95 ERA and 75 strikeouts. Neubeck and Brayton Thomas combined for 125.2 innings, 130 strikeouts and 64 earned runs.",
   "Before Indiana, Myers coached the Greensboro Grasshoppers, the Pittsburgh Pirates' High-A affiliate. His staff threw two perfect games in nine days in 2025 and was named the Pirates organization’s Staff of the Year.",
   "Myers pitched at three colleges, finishing at Tennessee in 1996–97, then began coaching there as a graduate assistant. He went on to serve as a head coach at UNC Asheville and Western Kentucky, earning 2003 Big South Coach of the Year, and coached pitchers at Auburn, Western Kentucky, UNC Wilmington and Lipscomb.",
   "At Lipscomb, Myers coached 2023 ASUN Pitcher of the Year Logan Van Treeck, who went 8-5 with 108 strikeouts and 14 walks. At UNC Wilmington, his staff set a program strikeout record with 557 in 2019, won the CAA Tournament and reached the NCAA Chapel Hill Regional."
  ],
  journey:["2026–Present — Indiana (Assistant Coach/Pitching)","2024–2025 — Greensboro Grasshoppers, Pittsburgh Pirates (Pitching Coach)","2022–2023 — Lipscomb (Assistant Coach)","2019–2021 — UNC Wilmington (Assistant Coach)","2016–2018 — Bowling Green High School (Head Coach)","2012–2015 — Western Kentucky (Head Coach)","2008–2011 — Western Kentucky (Assistant Coach)","2005–2007 — Auburn (Assistant Coach)","2001–2004 — UNC Asheville (Head Coach)","2000 — UNC Asheville (Assistant Coach)","1999 — Tennessee (Graduate Assistant)"]
 },
 "matt-morrow/4448":{
  bio:[
   "Matt Morrow, who brings significant ties to the Midwest, was announced as Indiana's Assistant Coach/Hitting & Infield on July 28, 2026. He assists head coach Jeff Mercer and Zach Weatherford with the offensive system, works with the infielders and coaches first base.",
   "A four-year Wright State letterwinner, Morrow played in 224 games with 214 starts, recording 242 hits and 201 runs with a .415 on-base percentage. He was a 2015 Freshman All-American, a three-time First Team All-Horizon League selection and advanced to the 2018 NCAA Tournament under Mercer. He started four years at second base and had a .981 fielding percentage.",
   "After college, Morrow played two seasons in the Pittsburgh Pirates organization as an undrafted free agent. He began coaching as a volunteer assistant at Illinois-Chicago and later worked at Wabash Valley, St. Louis and Kentucky.",
   "At Kentucky in 2026, Morrow served as Director of Offensive Development. The Wildcats reached the NCAA Morgantown Regional final, hit 62 home runs, and stole 131 bases in 157 attempts."
  ],
  journey:["2027–Present — Indiana (Assistant Coach/Hitting & Infield)","2026 — Kentucky (Director of Offensive Development)","2025 — St. Louis (Assistant Coach/Hitting)","2023–2024 — Wabash Valley (Assistant Coach/Hitting & Recruiting Coordinator)","2021–2022 — Illinois-Chicago (Volunteer Assistant Coach)"]
 },
 "sean-mullen/4449":{
  bio:[
   "Sean Mullen, who brings collegiate and professional pitching experience, was announced as Indiana's Assistant Coach/Pitching & Catching on July 28, 2026. He assists pitching coach Matt Myers with the staff and works with the catchers to build a cohesive relationship on the mound.",
   "Mullen had a standout season pitching for UCLA under John Savage in 2021, going 9-1 with a 3.39 ERA before being selected by Tampa Bay in the 11th round of the MLB Draft. Colorado had also drafted him out of high school. He made 34 collegiate appearances, including 14 starts.",
   "Mullen pitched two seasons in the Rays organization, including 30 appearances for High-A Bowling Green in 2022, and briefly played independent-league baseball for the Lincoln Saltdogs in 2025. Before joining Indiana, he was Omaha's Director of Pitcher Development."
  ],
  journey:["2027–Present — Indiana (Assistant Coach/Pitching & Catching)","2026 — Omaha (Director of Pitcher Development)","2025 — Lincoln Saltdogs (Independent League)","2022 — Bowling Green, Tampa Bay Rays (High-A)","2021 — UCLA (9-1, 3.39 ERA; 11th-round MLB Draft selection)"]
 }
};
const TEAM_HISTORY={
 "2026":{
  record:"23-31","conferenceRecord":"9-21",
  batting:[["Hits","515"],["Doubles","92"],["Home Runs","66"],["RBIs","330"],["Walks","261"],["Stolen Bases","45"]],
  pitching:[],
  fielding:[],
  highlights:["Hogan Denny, Jake Hanley and Caleb Koskie each hit .335 or better in 100+ at-bats.","The trio combined for 200 hits, 34 home runs, 43 doubles and 134 RBIs.","Tony Neubeck led the staff with a 7-4 record, 3.95 ERA and 75 strikeouts."]
 },
 "2025":{
  record:"32-24","conferenceRecord":"16-14",
  batting:[["AVG",".298"],["OPS",".930"],["At Bats","1,883"],["Runs","459"],["Hits","561"],["RBIs","423"],["Doubles","108"],["Triples","13"],["Home Runs","90"],["Slugging %",".512"],["Walks","307"],["Stolen Bases","45-58"]],
  pitching:[["WHIP","1.51"],["Innings Pitched","469.2"],["Hits Allowed","477"],["Earned Runs","293"],["Strikeouts","459"],["Home Runs Allowed","64"]],
  fielding:[["Fielding %",".970"],["Errors","58"],["Double Plays","108"]],
  highlights:["Season results and team totals from Indiana's official cumulative statistics."]
 },
 "2024":{
  record:"33-26-1","conferenceRecord":"15-9",
  batting:[["AVG",".295"],["OPS",".882"],["At Bats","2,117"],["Runs","482"],["Hits","625"],["RBIs","451"],["Doubles","140"],["Triples","8"],["Home Runs","83"],["Slugging %",".487"],["Walks","288"],["Stolen Bases","38-45"]],
  pitching:[["WHIP","1.56"],["Innings Pitched","523.0"],["Hits Allowed","533"],["Earned Runs","361"],["Strikeouts","589"],["Home Runs Allowed","97"]],
  fielding:[["Fielding %",".966"],["Errors","71"],["Double Plays","140"]],
  highlights:["Reached the Big Ten Tournament semifinals and the NCAA Knoxville Regional."]
 }
};
const INDIVIDUAL_STATS={
 "2026":{
  batting:[
   {name:"Caleb Koskie",avg:".372",ops:"1.029",ab:"148",r:"28",h:"55",hr:"6",rbi:"42",bb:"19",so:"23",sb:"2 - 2"},
   {name:"Hogan Denny",avg:".357",ops:"1.099",ab:"207",r:"63",h:"74",hr:"14",rbi:"44",bb:"28",so:"32",sb:"11 - 14"},
   {name:"Jake Hanley",avg:".338",ops:"1.053",ab:"210",r:"56",h:"71",hr:"14",rbi:"48",bb:"43",so:"47",sb:"0 - 0"},
   {name:"Cole Decker",avg:".316",ops:".872",ab:"171",r:"27",h:"54",hr:"4",rbi:"28",bb:"27",so:"38",sb:"8 - 11"},
   {name:"Cooper Malamazian",avg:".301",ops:".833",ab:"196",r:"33",h:"59",hr:"4",rbi:"36",bb:"27",so:"48",sb:"4 - 7"},
   {name:"Landen Fry",avg:".280",ops:".698",ab:"186",r:"28",h:"52",hr:"2",rbi:"30",bb:"13",so:"22",sb:"0 - 0"},
   {name:"Will Moore",avg:".257",ops:".780",ab:"175",r:"48",h:"45",hr:"4",rbi:"23",bb:"35",so:"46",sb:"3 - 6"},
   {name:"Ayden Crouse",avg:".242",ops:".679",ab:"95",r:"20",h:"23",hr:"2",rbi:"10",bb:"10",so:"27",sb:"12 - 15"},
   {name:"Brayden Ricketts",avg:".235",ops:".828",ab:"153",r:"24",h:"36",hr:"9",rbi:"28",bb:"27",so:"38",sb:"0 - 0"},
   {name:"Owen ten Oever",avg:".314",ops:".960",ab:"86",r:"16",h:"27",hr:"6",rbi:"27",bb:"11",so:"23",sb:"1 - 1"},
   {name:"Cal Gates",avg:".175",ops:".538",ab:"63",r:"11",h:"11",hr:"1",rbi:"7",bb:"6",so:"18",sb:"2 - 2"},
   {name:"T.J. Schuyler",avg:".075",ops:".272",ab:"80",r:"3",h:"6",hr:"0",rbi:"5",bb:"7",so:"24",sb:"1 - 1"},
   {name:"Mateo Noto",avg:".071",ops:".259",ab:"14",r:"1",h:"1",hr:"0",rbi:"1",bb:"2",so:"4",sb:"0 - 0"},
   {name:"Aiden Stewart",avg:".059",ops:".392",ab:"17",r:"2",h:"1",hr:"0",rbi:"0",bb:"6",so:"9",sb:"0 - 0"},
   {name:"Davian Carrera",avg:".000",ops:".000",ab:"6",r:"0",h:"0",hr:"0",rbi:"1",bb:"0",so:"4",sb:"0 - 0"},
   {name:"Miles Mador",avg:".000",ops:".000",ab:"3",r:"0",h:"0",hr:"0",rbi:"0",bb:"0",so:"1",sb:"0 - 0"},
   {name:"Brodey Bitove",avg:".000",ops:".000",ab:"2",r:"0",h:"0",hr:"0",rbi:"0",bb:"0",so:"2",sb:"0 - 0"}
  ],
  pitching:[
   {name:"Tony Neubeck",era:"3.95",whip:"1.34",w:"7",l:"4",app:"14",gs:"14",ip:"70.2",h:"68",er:"31",bb:"27",so:"75",sv:"0"},
   {name:"Brayton Thomas",era:"5.40",whip:"1.47",w:"1",l:"5",app:"14",gs:"14",ip:"55.0",h:"45",er:"33",bb:"36",so:"55",sv:"0"},
   {name:"Evan O'Neill",era:"3.60",whip:".80",w:"0",l:"0",app:"6",gs:"0",ip:"5.0",h:"3",er:"2",bb:"1",so:"7",sv:"0"},
   {name:"Ivan Mastalski",era:"3.89",whip:"1.41",w:"1",l:"0",app:"19",gs:"4",ip:"34.2",h:"35",er:"15",bb:"14",so:"33",sv:"0"},
   {name:"Anthony Gubitosi",era:"4.26",whip:"1.50",w:"2",l:"1",app:"10",gs:"0",ip:"12.2",h:"11",er:"6",bb:"8",so:"12",sv:"0"},
   {name:"Jackson Bergman",era:"4.50",whip:"1.64",w:"1",l:"1",app:"3",gs:"3",ip:"14.0",h:"18",er:"7",bb:"5",so:"9",sv:"0"},
   {name:"Gavin Seebold",era:"4.67",whip:"1.49",w:"2",l:"4",app:"17",gs:"0",ip:"44.1",h:"40",er:"23",bb:"26",so:"56",sv:"2"},
   {name:"Jacob Vogel",era:"4.84",whip:"1.25",w:"1",l:"1",app:"22",gs:"0",ip:"35.1",h:"31",er:"19",bb:"13",so:"30",sv:"0"},
   {name:"Michael Sarhatt",era:"6.97",whip:"2.08",w:"0",l:"1",app:"19",gs:"0",ip:"20.2",h:"26",er:"16",bb:"17",so:"23",sv:"1"},
   {name:"Jackson Yarberry",era:"7.59",whip:"1.76",w:"0",l:"5",app:"19",gs:"1",ip:"40.1",h:"50",er:"34",bb:"21",so:"47",sv:"2"},
   {name:"Conner Linn",era:"7.82",whip:"1.93",w:"4",l:"1",app:"18",gs:"9",ip:"35.2",h:"51",er:"31",bb:"18",so:"32",sv:"0"},
   {name:"Pete Haas",era:"9.18",whip:"1.86",w:"1",l:"0",app:"14",gs:"1",ip:"16.2",h:"23",er:"17",bb:"8",so:"6",sv:"0"},
   {name:"Reagan Rivera",era:"9.35",whip:"1.82",w:"0",l:"5",app:"19",gs:"8",ip:"43.1",h:"54",er:"45",bb:"25",so:"52",sv:"3"},
   {name:"Kellen English",era:"10.80",whip:"2.10",w:"1",l:"1",app:"15",gs:"0",ip:"13.1",h:"13",er:"16",bb:"15",so:"22",sv:"0"},
   {name:"Kaden Jacobi",era:"14.11",whip:"2.86",w:"1",l:"2",app:"17",gs:"0",ip:"14.2",h:"27",er:"23",bb:"15",so:"16",sv:"0"},
   {name:"Ian White Jr.",era:"15.43",whip:"3.00",w:"0",l:"0",app:"3",gs:"0",ip:"2.1",h:"4",er:"4",bb:"3",so:"4",sv:"0"},
   {name:"Xavier Carrera",era:"18.00",whip:"3.00",w:"1",l:"0",app:"7",gs:"0",ip:"4.0",h:"4",er:"8",bb:"8",so:"4",sv:"0"},
   {name:"Eli Walker",era:"67.50",whip:"6.75",w:"0",l:"0",app:"3",gs:"0",ip:"1.1",h:"5",er:"10",bb:"4",so:"1",sv:"0"}
  ]
 }
};
const STAFF=[["Chris Virtue","Director of Athletic Performance","chris-virtue/758","20211117_BA_PhotoDay_1210.JPG","2022/1/5","(812) 856-1807","cvirtue@iu.edu"],
["Austin Fitzpatrick","Athletic Trainer, Baseball","austin-fitzpatrick/760","-Fitzpatrick.png","2026/3/5","","ausfitz@iu.edu"]];


// First game of the 2027 season, used for the home page countdown.
const NEXT_GAME = {opp:"UNCW", where:"vs. UNCW \u2014 Spartanburg, S.C.", when:"Friday, February 26 \u00b7 1:30 p.m. ET", iso:"2027-02-26T13:30:00-05:00"};
const PROJECTED_STARTERS=[];
const MLB_ALUMNI=[
 {name:"Mike Simon",position:"Catcher",status:"Former MLB player"},
 {name:"Whitey Wilshere",position:"MLB alumnus",status:"Former MLB player"},
 {name:"Pinky May",position:"MLB alumnus",status:"Former MLB player"},
 {name:"Mike Kosman",position:"Pinch runner",status:"Former MLB player"},
 {name:"Kermit Wahl",position:"Third base",status:"Former MLB player"},
 {name:"Mike Modak",position:"Pitcher",status:"Former MLB player"},
 {name:"Ernie Andres",position:"Third base",status:"Former MLB player"},
 {name:"John Corriden",position:"Pinch runner",status:"Former MLB player"},
 {name:"Ted Kluszewski",position:"First base",status:"Former MLB player"},
 {name:"Bob Wellman",position:"Outfielder",status:"Former MLB player"},
 {name:"Ralph Brickner",position:"Pitcher",status:"Former MLB player"},
 {name:"Sammy Esposito",position:"Third base",status:"Former MLB player"},
 {name:"Ron Keller",position:"Right-handed pitcher",status:"Former MLB player",draftTeam:"Minnesota Twins",draftTeamId:142,draftYear:1965,draftRound:"8",draftPick:143},
 {name:"Bruce Miller",position:"Shortstop",status:"Former MLB player",draftTeam:"Chicago White Sox",draftTeamId:145,draftYear:1970,draftRound:"20",draftPick:469},
 {name:"Barry Jones",position:"Right-handed pitcher",status:"Former MLB player",draftTeam:"Pittsburgh Pirates",draftTeamId:134,draftYear:1984,draftRound:"3",draftPick:69},
 {name:"Mickey Morandini",position:"Shortstop",status:"Former MLB player",draftTeam:"Philadelphia Phillies",draftTeamId:143,draftYear:1988,draftRound:"5",draftPick:120},
 {name:"John Wehner",position:"Third base",status:"Former MLB player",draftTeam:"Pittsburgh Pirates",draftTeamId:134,draftYear:1988,draftRound:"7",draftPick:174},
 {name:"Chris Peters",position:"Left-handed pitcher",status:"Former MLB player",draftTeam:"Pittsburgh Pirates",draftTeamId:134,draftYear:1993,draftRound:"37",draftPick:1046},
 {name:"Kevin Orie",position:"Shortstop",status:"Former MLB player",draftTeam:"Chicago Cubs",draftTeamId:112,draftYear:1993,draftRound:"Comp A",draftPick:29},
 {name:"Doug DeVore",position:"Outfielder",status:"Former MLB player",draftTeam:"Arizona Diamondbacks",draftTeamId:109,draftYear:1999,draftRound:"12",draftPick:358},
 {name:"Zach McClellan",position:"Right-handed pitcher",status:"Former MLB player",draftTeam:"Kansas City Royals",draftTeamId:118,draftYear:2000,draftRound:"5",draftPick:134},
 {name:"Kevin Mahar",position:"Outfielder",status:"Former MLB player"},
 {name:"Jake Dunning",position:"Right-handed pitcher",status:"Former MLB player",draftTeam:"San Francisco Giants",draftTeamId:137,draftYear:2009,draftRound:"33",draftPick:987},
 {name:"Josh Phegley",position:"Catcher",status:"Former MLB player",pastTeams:["Chicago White Sox","Oakland Athletics","Chicago Cubs"],draftTeam:"Chicago White Sox",draftTeamId:145,draftYear:2009,draftRound:"Comp A",draftPick:38},
 {name:"Micah Johnson",position:"Second base",status:"Former MLB player",pastTeams:["Chicago White Sox","Los Angeles Dodgers","Atlanta Braves"],draftTeam:"Chicago White Sox",draftTeamId:145,draftYear:2012,draftRound:"9",draftPick:291},
 {name:"Kyle Schwarber",position:"DH / Outfielder",status:"Active MLB player",currentTeam:"Philadelphia Phillies",currentTeamId:143,pastTeams:["Chicago Cubs","Washington Nationals","Boston Red Sox"],draftTeam:"Chicago Cubs",draftTeamId:112,draftYear:2014,draftRound:"1",draftPick:4},
 {name:"Alex Dickerson",position:"Outfielder",status:"Former MLB player",pastTeams:["San Diego Padres","San Francisco Giants","Atlanta Braves"],draftTeam:"Pittsburgh Pirates",draftTeamId:134,draftYear:2011,draftRound:"3",draftPick:91},
 {name:"Sam Travis",position:"First base",status:"Former MLB player",pastTeams:["Boston Red Sox"],draftTeam:"Boston Red Sox",draftTeamId:111,draftYear:2014,draftRound:"2",draftPick:67},
 {name:"Aaron Slegers",position:"Right-handed pitcher",status:"Former MLB player",pastTeams:["Los Angeles Angels","Minnesota Twins","Tampa Bay Rays"],draftTeam:"Minnesota Twins",draftTeamId:142,draftYear:2013,draftRound:"5",draftPick:140},
 {name:"Caleb Baragar",position:"Left-handed pitcher",status:"Former MLB player",draftTeam:"San Francisco Giants",draftTeamId:137,draftYear:2016,draftRound:"9",draftPick:275},
 {name:"Kyle Hart",position:"Left-handed pitcher",status:"Minor Leagues",currentTeam:"ACL Padres",currentTeamId:135,draftTeam:"Boston Red Sox",draftTeamId:111,draftYear:2016,draftRound:"19",draftPick:568},
 {name:"Jonathan Stiever",position:"Right-handed pitcher",status:"Former MLB player",draftTeam:"Chicago White Sox",draftTeamId:145,draftYear:2018,draftRound:"5",draftPick:138},
 {name:"Scott Effross",position:"Right-handed pitcher",status:"Former MLB player",draftTeam:"Chicago Cubs",draftTeamId:112,draftYear:2015,draftRound:"15",draftPick:443},
 {name:"Tim Herrin",position:"Left-handed pitcher",status:"Active MLB player",currentTeam:"Cleveland Guardians",currentTeamId:114,draftTeam:"Cleveland Guardians",draftTeamId:114,draftYear:2018,draftRound:"29",draftPick:883},
 {name:"Andrew Saalfrank",position:"Left-handed pitcher",status:"Active MLB player",currentTeam:"Arizona Diamondbacks",currentTeamId:109,draftTeam:"Arizona Diamondbacks",draftTeamId:109,draftYear:2019,draftRound:"6",draftPick:182},
 {name:"Tanner Gordon",position:"Right-handed pitcher",status:"Active MLB player",currentTeam:"Colorado Rockies",currentTeamId:115,draftTeam:"Atlanta Braves",draftTeamId:144,draftYear:2019,draftRound:"6",draftPick:187},
 {name:"Craig Yoho",position:"Right-handed pitcher",status:"Minor Leagues",currentTeam:"Columbus Clippers",currentTeamId:114,draftTeam:"Milwaukee Brewers",draftTeamId:158,draftYear:2023,draftRound:"8",draftPick:242},
 {name:"Matt Gorski",position:"Outfielder",status:"Former MLB player",draftTeam:"Pittsburgh Pirates",draftTeamId:134,draftYear:2019,draftRound:"2",draftPick:57},
 {name:"Jack Perkins",position:"Right-handed pitcher",status:"Active MLB player",currentTeam:"Oakland Athletics",currentTeamId:133,draftTeam:"Athletics",draftTeamId:133,draftYear:2022,draftRound:"5",draftPick:154},
 {name:"McCade Brown",position:"Right-handed pitcher",status:"Active MLB player",currentTeam:"Colorado Rockies",currentTeamId:115,draftTeam:"Colorado Rockies",draftTeamId:115,draftYear:2021,draftRound:"3",draftPick:79}
];
const CURRENT_PRO_HOOSIERS=[
 {name:"Jackson Bergman",level:"Rookie / ACL"},
 {name:"Ben Grable",level:"Triple-A"},
 {name:"Cole Gilley",level:"Single-A"},
 {name:"Korbyn Dickerson",level:"High-A"},
 {name:"Devin Taylor",level:"Triple-A"},
 {name:"Brayden Risedorph",level:"High-A"},
 {name:"Brock Tibbitts",level:"Released"},
 {name:"Connor Foley",level:"Single-A"},
 {name:"Carter Mathison",level:"High-A"},
 {name:"Nick Mitchell",level:"Double-A"},
 {name:"Luke Sinnard",level:"Double-A"},
 {name:"Phillip Glasser",level:"Triple-A"},
 {name:"Craig Yoho",level:"Triple-A"},
 {name:"Bradley Brehmer",level:"Double-A"},
 {name:"Jack Perkins",team:"Athletics",teamId:133,level:"MLB"},
 {name:"Grant Richardson",level:"Triple-A"},
 {name:"Gabe Bierman",level:"Double-A"},
 {name:"McCade Brown",team:"Colorado Rockies",teamId:115,level:"MLB"},
 {name:"Matt Gorski",level:"Triple-A"},
 {name:"Andrew Saalfrank",team:"Arizona Diamondbacks",teamId:109,level:"MLB"},
 {name:"Tanner Gordon",team:"Colorado Rockies",teamId:115,level:"MLB"},
 {name:"Tim Herrin",team:"Cleveland Guardians",teamId:114,level:"MLB"},
 {name:"Kyle Hart",level:"Rookie / ACL"},
 {name:"Caleb Baragar",level:"Mexican League"},
 {name:"Scott Effross",level:"Triple-A"},
 {name:"Sam Travis",level:"Mexican League"},
 {name:"Kyle Schwarber",team:"Philadelphia Phillies",teamId:143,level:"MLB"},
 {name:"Aaron Slegers",level:"Retired"},
 {name:"Micah Johnson",level:"Retired"},
 {name:"Alex Dickerson",level:"Independent"},
 {name:"Jake Dunning",level:"Retired"},
 {name:"Josh Phegley",level:"Retired"},
 {name:"Zach McClellan",level:"Retired"},
 {name:"Doug DeVore",level:"Retired"},
 {name:"Chris Peters",level:"Retired"},
 {name:"Kevin Orie",level:"Retired"},
 {name:"John Wehner",level:"Retired"},
 {name:"Mickey Morandini",level:"Retired"},
 {name:"Barry Jones",level:"Retired"},
 {name:"Bruce Miller",level:"Retired"},
 {name:"Ron Keller",level:"Retired"}
];
const MLB_ALUMNI_DETAILS={
 "Mike Simon":{position:"Catcher",status:"Retired",currentTeam:"Brooklyn Tip-Tops",pastTeams:["Pittsburgh Pirates","St. Louis Terriers"],debutDate:"1909-06-27",debutTeam:"Pittsburgh Pirates"},
 "Whitey Wilshere":{position:"Pitcher",status:"Retired",currentTeam:"Philadelphia Athletics",pastTeams:[],debutDate:"1934-06-24",debutTeam:"Philadelphia Athletics"},
 "Pinky May":{position:"Third base",status:"Retired",currentTeam:"Philadelphia Phillies",pastTeams:[],debutDate:"1939-04-21",debutTeam:"Philadelphia Phillies"},
 "Mike Kosman":{position:"Pinch runner",status:"Retired",currentTeam:"Cincinnati Reds",pastTeams:[],debutDate:"1944-04-20",debutTeam:"Cincinnati Reds"},
 "Kermit Wahl":{position:"Third base",status:"Retired",currentTeam:"Philadelphia Athletics",pastTeams:["Cincinnati Reds","St. Louis Browns"],debutDate:"1944-06-22",debutTeam:"Cincinnati Reds"},
 "Mike Modak":{position:"Pitcher",status:"Retired",currentTeam:"Cincinnati Reds",pastTeams:[],debutDate:"1945-07-04",debutTeam:"Cincinnati Reds"},
 "Ernie Andres":{position:"Third base",status:"Retired",currentTeam:"Boston Red Sox",pastTeams:[],debutDate:"1946-04-16",debutTeam:"Boston Red Sox"},
 "John Corriden":{position:"Pinch runner",status:"Retired",currentTeam:"Brooklyn Dodgers",pastTeams:[],debutDate:"1946-04-20",debutTeam:"Brooklyn Dodgers"},
 "Ted Kluszewski":{position:"First base",status:"Retired",currentTeam:"Los Angeles Angels",pastTeams:["Cincinnati Reds","Cincinnati Redlegs","Pittsburgh Pirates","Chicago White Sox"],debutDate:"1947-04-18",debutTeam:"Cincinnati Reds"},
 "Bob Wellman":{position:"Outfielder",status:"Retired",currentTeam:"Philadelphia Athletics",pastTeams:[],debutDate:"1948-09-23",debutTeam:"Philadelphia Athletics"},
 "Ralph Brickner":{position:"Pitcher",status:"Retired",currentTeam:"Boston Red Sox",pastTeams:[],debutDate:"1952-05-04",debutTeam:"Boston Red Sox"},
 "Sammy Esposito":{position:"Third base",status:"Retired",currentTeam:"Kansas City Athletics",pastTeams:["Chicago White Sox"],debutDate:"1952-09-28",debutTeam:"Chicago White Sox"},
 "Ron Keller":{position:"Pitcher",status:"Retired",currentTeam:"Minnesota Twins",pastTeams:[],debutDate:"1966-07-09",debutTeam:"Minnesota Twins",iuYears:"1962–1965"},
 "Bruce Miller":{position:"Third base",status:"Retired",currentTeam:"San Francisco Giants",pastTeams:[],debutDate:"1973-08-04",debutTeam:"San Francisco Giants"},
 "Barry Jones":{position:"Pitcher",status:"Retired",currentTeam:"Chicago White Sox",pastTeams:["Pittsburgh Pirates","Montreal Expos","Philadelphia Phillies","New York Mets"],debutDate:"1986-07-18",debutTeam:"Pittsburgh Pirates"},
 "Mickey Morandini":{position:"Second base",status:"Retired",currentTeam:"Toronto Blue Jays",pastTeams:["Philadelphia Phillies","Chicago Cubs"],debutDate:"1990-09-01",debutTeam:"Philadelphia Phillies"},
 "John Wehner":{position:"Third base",status:"Retired",currentTeam:"Pittsburgh Pirates",pastTeams:["Florida Marlins"],debutDate:"1991-07-17",debutTeam:"Pittsburgh Pirates"},
 "Chris Peters":{position:"Pitcher",status:"Retired",currentTeam:"Montreal Expos",pastTeams:["Pittsburgh Pirates"],debutDate:"1996-07-19",debutTeam:"Pittsburgh Pirates"},
 "Kevin Orie":{position:"Third base",status:"Retired",currentTeam:"Chicago Cubs",pastTeams:["Florida Marlins"],debutDate:"1997-04-01",debutTeam:"Chicago Cubs"},
 "Doug DeVore":{position:"Outfielder",status:"Retired",currentTeam:"Arizona Diamondbacks",pastTeams:[],debutDate:"2004-05-06",debutTeam:"Arizona Diamondbacks"},
 "Zach McClellan":{position:"Pitcher",status:"Retired",currentTeam:"Colorado Rockies",pastTeams:[],debutDate:"2007-04-16",debutTeam:"Colorado Rockies"},
 "Kevin Mahar":{position:"Outfielder",status:"Retired",currentTeam:"Texas Rangers",pastTeams:[],debutDate:"2007-05-16",debutTeam:"Texas Rangers"},
 "Jake Dunning":{position:"Pitcher",status:"Retired",currentTeam:"San Francisco Giants",pastTeams:[],debutDate:"2013-06-16",debutTeam:"San Francisco Giants"},
 "Josh Phegley":{position:"Catcher",status:"Retired",currentTeam:"Chicago Cubs",pastTeams:["Chicago White Sox","Oakland Athletics"],debutDate:"2013-07-05",debutTeam:"Chicago White Sox",iuYears:"2007–2009"},
 "Micah Johnson":{position:"Second base",status:"Retired",currentTeam:"Atlanta Braves",pastTeams:["Chicago White Sox","Los Angeles Dodgers"],debutDate:"2015-04-06",debutTeam:"Chicago White Sox",iuYears:"2010–2012"},
 "Kyle Schwarber":{position:"Designated hitter / Outfielder",status:"Active MLB player",currentTeam:"Philadelphia Phillies",pastTeams:["Chicago Cubs","Washington Nationals","Boston Red Sox"],debutDate:"2015-06-16",debutTeam:"Chicago Cubs",iuYears:"2012–2014"},
 "Alex Dickerson":{position:"Outfielder",status:"Independent",currentTeam:"Leones de Ponce",pastTeams:["San Diego Padres","San Francisco Giants","Atlanta Braves"],debutDate:"2015-08-06",debutTeam:"San Diego Padres",iuYears:"2009–2011"},
 "Sam Travis":{position:"First base",status:"Mexican League",currentTeam:"Caliente de Durango",pastTeams:["Boston Red Sox"],debutDate:"2017-05-24",debutTeam:"Boston Red Sox",iuYears:"2012–2014"},
 "Aaron Slegers":{position:"Pitcher",status:"Retired",currentTeam:"Tampa Bay Rays",pastTeams:["Los Angeles Angels","Minnesota Twins"],debutDate:"2017-08-17",debutTeam:"Minnesota Twins",iuYears:"2010–2013"},
 "Caleb Baragar":{position:"Pitcher",status:"Mexican League",currentTeam:"Toros de Tijuana",pastTeams:["San Francisco Giants"],debutDate:"2020-07-25",debutTeam:"San Francisco Giants"},
 "Kyle Hart":{position:"Pitcher",status:"Rookie / ACL",currentTeam:"ACL Padres",pastTeams:["Boston Red Sox","San Diego Padres"],debutDate:"2020-08-13",debutTeam:"Boston Red Sox"},
 "Jonathan Stiever":{position:"Pitcher",status:"Retired",currentTeam:"Chicago White Sox",pastTeams:[],debutDate:"2020-09-13",debutTeam:"Chicago White Sox",iuYears:"2016–2018"},
 "Scott Effross":{position:"Pitcher",status:"Triple-A",currentTeam:"Tacoma Rainiers",pastTeams:["Chicago Cubs","New York Yankees"],debutDate:"2021-08-29",debutTeam:"Chicago Cubs"},
 "Tim Herrin":{position:"Pitcher",status:"Active MLB player",currentTeam:"Cleveland Guardians",pastTeams:[],debutDate:"2023-04-02",debutTeam:"Cleveland Guardians",iuYears:"2016–2018"},
 "Andrew Saalfrank":{position:"Pitcher",status:"Active MLB player",currentTeam:"Arizona Diamondbacks",pastTeams:[],debutDate:"2023-09-05",debutTeam:"Arizona Diamondbacks",iuYears:"2017–2019"},
 "Tanner Gordon":{position:"Pitcher",status:"Active MLB player",currentTeam:"Colorado Rockies",pastTeams:[],debutDate:"2024-07-07",debutTeam:"Colorado Rockies",iuYears:"2017–2019"},
 "Craig Yoho":{position:"Pitcher",status:"Triple-A",currentTeam:"Columbus Clippers",pastTeams:["Milwaukee Brewers","Cleveland Guardians"],debutDate:"2025-04-21",debutTeam:"Milwaukee Brewers"},
 "Matt Gorski":{position:"First base",status:"Triple-A",currentTeam:"Oklahoma City Comets",pastTeams:["Pittsburgh Pirates"],debutDate:"2025-04-24",debutTeam:"Pittsburgh Pirates"},
 "Jack Perkins":{position:"Pitcher",status:"Active MLB player",currentTeam:"Athletics",pastTeams:[],debutDate:"2025-06-22",debutTeam:"Athletics",iuYears:"2019–2022"},
 "McCade Brown":{position:"Pitcher",status:"Active MLB player",currentTeam:"Colorado Rockies",pastTeams:[],debutDate:"2025-08-24",debutTeam:"Colorado Rockies",iuYears:"2019–2021"}
};
const LIVE_GAME=null;

function blankBatting(){return {avg:"\u2014",ops:"\u2014",ab:"\u2014",h:"\u2014",hr:"\u2014",rbi:"\u2014",bb:"\u2014",sb:"\u2014"};}
function blankPitching(){return {era:"\u2014",w:"\u2014",l:"\u2014",so:"\u2014",ip:"\u2014",bb:"\u2014",whip:"\u2014",sv:"\u2014"};}