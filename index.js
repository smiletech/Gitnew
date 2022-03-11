const Name = document.getElementById("Name");
const Age = document.getElementById("Age");
const Batsman = document.getElementById("Batsman");
const Bolwer = document.getElementById("Bolwer");
let cricketplayer = ""; //document.getElementById("cricketplayer");
const Tb = document.getElementById("Tb");

function checkBox() {
  if (Batsman.checked && Bolwer.checked) cricketplayer = "Batsman & Bolwer";
  else if (Batsman.checked) cricketplayer = "Batsman";
  else if (Bolwer.checked) cricketplayer = "Bolwer";
  else cricketplayer = "";
}
checkBox();

function reset() {
  Name.value = "";
  Age.value = "";
  cricketplayer = "";
  Batsman.checked = false;
  Bolwer.checked = false;
}

reset();
let PlayerList = [];

PlayerList = JSON.parse(localStorage.getItem("Player-List")) || [];
PlayerList.length == 0
  ? (Tb.innerHTML = "<p>No players are added</p>")
  : Start1();

function PlayerHander() {
  if (Name.value == "" || Age.value == "" || cricketplayer == "") {
    alert("please Fill all value");
    return;
  }

  const OnePlayer = {
    Name: Name.value,
    Age: Age.value,
    PlyerType: cricketplayer,
  };

  if (PlayerList.length <= 10) {
    if (checkValue(OnePlayer, PlayerList)) {
      PlayerList.push(OnePlayer);
      localStorage.setItem("Player-List", JSON.stringify(PlayerList));
      alert("one Member added!");
    } else {
      alert(" this batsmen already here");
    }

    reset();
    Start1();
  } else {
    alert("sorry!! 11 player already done.");
  }
}

function checkValue(OnePlayer, PlayerList) {
  if (PlayerList.length == 0) return true;
  else {
    for (let i of PlayerList) {
      if (
        i.Name.toLowerCase() === OnePlayer.Name.toLowerCase() &&
        i.PlyerType === OnePlayer.PlyerType
      )
        return false;
    }
  }
  return true;
}

function Start1() {
  const Arr = JSON.parse(localStorage.getItem("Player-List"));
  Arr.length == 0;

  let tbl = `<h3>Team-Member</h3>
    <table class="Table-syt">
    <tr>
        <th>Sn.</th>
        <th>Name</th>
        <th>Age</th>
        <th>PlayerType</th>
       
    </tr>`;

  if (Arr.length == 0) {
    tbl += `<tr>No players are added</tr>`;
  } else {
    tbl += Arr.map(
      (e, index) =>
        `<tr>
        <td>${index + 1}</td>
        <td>${e.Name}</td>
        <td>${e.Age}</td>
        <td>${e.PlyerType}</td>
        <td>
          <button class="btn-tbl" onclick=Delete(${index})>X</button>
        </td>
      </tr>`
    );
  }

  Tb.innerHTML = tbl + "</table>";
  return Tb;
}

function Delete(index) {
  const Arr = JSON.parse(localStorage.getItem("Player-List"));
  Arr.splice(index, 1);
  localStorage.setItem("Player-List", JSON.stringify(Arr));
  Start1();
}

function negative() {
  Age.value = parseInt(Age.value) - 1;
  if (Age.value <= 0) Age.value = 0;
}
function Positive() {
  Age.value = parseInt(Age.value) + 1;
  if (Age.value > 100) Age.value = 0;
}
