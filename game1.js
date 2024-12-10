// 城市清單按洲分類
const cityData = {
  asia: [
    "東京 (日本)", "上海 (中國)", "香港 (中國)", "新加坡 (新加坡)", "曼谷 (泰國)", "台北 (台灣)", 
    "新北 (台灣)","台中 (台灣)","台南 (台灣)","高雄 (台灣)",
    "首爾 (南韓)", "北京 (中國)", "吉隆坡 (馬來西亞)", "新德里 (印度)", "孟買 (印度)"
  ],
  europe: [
    "倫敦 (英國)", "巴黎 (法國)", "柏林 (德國)", "漢堡 (德國)","慕尼黑 (德國)","羅馬 (義大利)", "米蘭 (義大利)", 
    "馬德里 (西班牙)", "巴塞隆納 (西班牙)", "莫斯科 (俄羅斯)", "阿姆斯特丹 (荷蘭)", 
    "維也納 (奧地利)"
  ],
  america: [
    "紐約 (美國)", "洛杉磯 (美國)", "舊金山 (美國)", "印地安納 (美國)", "邁阿密 (美國)", "芝加哥 (美國)", "波士頓 (美國)", 
    "奧斯丁 (美國)", "休士頓 (美國)", "西雅圖 (美國)", "里約熱內盧 (巴西)", "聖保羅 (巴西)", "墨西哥城 (墨西哥)", "多倫多 (加拿大)", 
    "溫哥華 (加拿大)"
  ],
  africa: [
    "開羅 (埃及)", "開普敦 (南非)", "約翰尼斯堡 (南非)", "拉各斯 (奈及利亞)", "卡薩布蘭卡 (摩洛哥)"
  ],
  oceania: [
    "雪梨 (澳洲)", "墨爾本 (澳洲)", "奧克蘭 (紐西蘭)", "布里斯本 (澳洲)", "珀斯 (澳洲)"
  ]
};

// 頁面載入後預設顯示城市清單
document.addEventListener("DOMContentLoaded", () => {
  displayCityList();
});

// 切換分頁
function showSection(sectionId) {
  document.querySelectorAll("section").forEach(section => {
    section.classList.remove("active");
  });
  document.getElementById(sectionId).classList.add("active");

  if (sectionId === "list") displayCityList();
}

// 生成城市清單
function displayCityList() {
  const listContainer = document.getElementById("city-list");
  listContainer.innerHTML = ""; // 清空舊內容

  for (const [continent, cities] of Object.entries(cityData)) {
    const continentHeader = document.createElement("div");
    continentHeader.textContent = getContinentName(continent);
    continentHeader.classList.add("continent-header");
    listContainer.appendChild(continentHeader);

    const cityList = document.createElement("ul");
    cities.forEach(city => {
      const cityItem = document.createElement("li");
      cityItem.textContent = city;
      cityList.appendChild(cityItem);
    });
    listContainer.appendChild(cityList);
  }
}

// 生成賓果卡
function generateBingoCard() {
  const selectedContinents = [];
  if (document.getElementById("asia").checked) selectedContinents.push("asia");
  if (document.getElementById("europe").checked) selectedContinents.push("europe");
  if (document.getElementById("america").checked) selectedContinents.push("america");
  if (document.getElementById("africa").checked) selectedContinents.push("africa");
  if (document.getElementById("oceania").checked) selectedContinents.push("oceania");

  if (selectedContinents.length === 0) {
    alert("請至少選擇一個洲！");
    return;
  }

  const filteredCities = selectedContinents.flatMap(continent => cityData[continent]);

  if (filteredCities.length < 25) {
    alert("所選洲的城市不足以生成完整的賓果卡！");
    return;
  }

  const shuffledCities = [...filteredCities];
  for (let i = shuffledCities.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledCities[i], shuffledCities[j]] = [shuffledCities[j], shuffledCities[i]];
  }
  const selectedCities = shuffledCities.slice(0, 25);

  const table = document.getElementById("bingo-card");
  table.innerHTML = "";

  let index = 0;
  for (let row = 0; row < 5; row++) {
    const tr = document.createElement("tr");
    for (let col = 0; col < 5; col++) {
      const td = document.createElement("td");
      td.textContent = selectedCities[index];
      tr.appendChild(td);
      index++;
    }
    table.appendChild(tr);
  }
}

// 洲別名稱對應
function getContinentName(key) {
  return {
    asia: "亞洲",
    europe: "歐洲",
    america: "美洲",
    africa: "非洲",
    oceania: "大洋洲"
  }[key];
}


// 生成賓果卡
function generateBingoCard() {
  // 收集使用者選擇的洲
  const selectedContinents = [];
  if (document.getElementById("asia").checked) selectedContinents.push("asia");
  if (document.getElementById("europe").checked) selectedContinents.push("europe");
  if (document.getElementById("america").checked) selectedContinents.push("america");
  if (document.getElementById("africa").checked) selectedContinents.push("africa");
  if (document.getElementById("oceania").checked) selectedContinents.push("oceania");

  // 確認至少選擇一個洲
  if (selectedContinents.length === 0) {
    alert("請至少選擇一個洲！");
    return;
  }

  // 篩選所選洲的城市
  const filteredCities = selectedContinents.flatMap(continent => cityData[continent]);

  // 確保城市數量足夠生成 25 個格子
  if (filteredCities.length < 25) {
    alert("所選洲的城市不足以生成完整的賓果卡！");
    return;
  }

  // 隨機選擇 25 個城市
  const shuffledCities = [...filteredCities];
  for (let i = shuffledCities.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledCities[i], shuffledCities[j]] = [shuffledCities[j], shuffledCities[i]];
  }
  const selectedCities = shuffledCities.slice(0, 25);

  // 插入到 5x5 的表格中
  const table = document.getElementById("bingo-card");
  table.innerHTML = ""; // 清空之前的內容

  let index = 0;
  for (let row = 0; row < 5; row++) {
    const tr = document.createElement("tr");
    for (let col = 0; col < 5; col++) {
      const td = document.createElement("td");
      td.textContent = selectedCities[index];
      tr.appendChild(td);
      index++;
    }
    table.appendChild(tr);
  }
}
