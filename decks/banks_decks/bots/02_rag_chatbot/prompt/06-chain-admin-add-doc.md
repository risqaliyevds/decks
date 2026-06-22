# Add Doc — multi-step file upload + index

> 13 nodes implementing /add command. Sets pending state, asks for file, receives document, uploads to Drive, ingests into vector store with embedding, appends a row to the Documents sheet, clears state.

**Node count:** 13

**Build order (topological):**

1. `Add Doc Init Set State`
2. `Add Doc Init Reply`
3. `Add Doc Waiting Reply`
4. `Add Doc File Get File`
5. `Add Doc File Upload to Drive`
6. `Add Doc Insert Vector Store`
7. `Add Doc Gemini Embeddings`
8. `Add Doc Data Loader`
9. `Add Doc Text Splitter`
10. `Add Doc Build Row`
11. `Add Doc Append to Documents`
12. `Add Doc Clear State`
13. `Add Doc File Reply`

---

## Add Doc Init Set State

- **Node type:** `n8n-nodes-base.googleSheets`
- **Type version:** 4.7
- **Position:** [2688, 1152]
- **Inbound:**
  - from `Route Request` → input 0
- **Outbound:**
  - output 0 → `Add Doc Init Reply`

### Parameters

```json
{
  "operation": "appendOrUpdate",
  "documentId": {
    "__rl": true,
    "mode": "id",
    "value": "1qsiZkdGyFepZyqFB7g38mfuK6J3Y7-SuNPw0RkmjI8c"
  },
  "sheetName": {
    "__rl": true,
    "mode": "name",
    "value": "AdminStates"
  },
  "columns": {
    "0": "{",
    "1": "\"",
    "2": "m",
    "3": "a",
    "4": "p",
    "5": "p",
    "6": "i",
    "7": "n",
    "8": "g",
    "9": "M",
    "10": "o",
    "11": "d",
    "12": "e",
    "13": "\"",
    "14": ":",
    "15": "\"",
    "16": "d",
    "17": "e",
    "18": "f",
    "19": "i",
    "20": "n",
    "21": "e",
    "22": "B",
    "23": "e",
    "24": "l",
    "25": "o",
    "26": "w",
    "27": "\"",
    "28": ",",
    "29": "\"",
    "30": "v",
    "31": "a",
    "32": "l",
    "33": "u",
    "34": "e",
    "35": "\"",
    "36": ":",
    "37": "{",
    "38": "\"",
    "39": "c",
    "40": "h",
    "41": "a",
    "42": "t",
    "43": "_",
    "44": "i",
    "45": "d",
    "46": "\"",
    "47": ":",
    "48": "\"",
    "49": "=",
    "50": "{",
    "51": "{",
    "52": " ",
    "53": "$",
    "54": "(",
    "55": "'",
    "56": "P",
    "57": "a",
    "58": "r",
    "59": "s",
    "60": "e",
    "61": " ",
    "62": "I",
    "63": "n",
    "64": "p",
    "65": "u",
    "66": "t",
    "67": "'",
    "68": ")",
    "69": ".",
    "70": "i",
    "71": "t",
    "72": "e",
    "73": "m",
    "74": ".",
    "75": "j",
    "76": "s",
    "77": "o",
    "78": "n",
    "79": ".",
    "80": "c",
    "81": "h",
    "82": "a",
    "83": "t",
    "84": "_",
    "85": "i",
    "86": "d",
    "87": " ",
    "88": "}",
    "89": "}",
    "90": "\"",
    "91": ",",
    "92": "\"",
    "93": "s",
    "94": "t",
    "95": "a",
    "96": "t",
    "97": "e",
    "98": "\"",
    "99": ":",
    "100": "\"",
    "101": "A",
    "102": "W",
    "103": "A",
    "104": "I",
    "105": "T",
    "106": "I",
    "107": "N",
    "108": "G",
    "109": "_",
    "110": "D",
    "111": "O",
    "112": "C",
    "113": "\"",
    "114": ",",
    "115": "\"",
    "116": "s",
    "117": "t",
    "118": "a",
    "119": "s",
    "120": "h",
    "121": "\"",
    "122": ":",
    "123": "\"",
    "124": "\"",
    "125": ",",
    "126": "\"",
    "127": "e",
    "128": "n",
    "129": "t",
    "130": "e",
    "131": "r",
    "132": "e",
    "133": "d",
    "134": "_",
    "135": "a",
    "136": "t",
    "137": "\"",
    "138": ":",
    "139": "\"",
    "140": "=",
    "141": "{",
    "142": "{",
    "143": " ",
    "144": "$",
    "145": "n",
    "146": "o",
    "147": "w",
    "148": ".",
    "149": "t",
    "150": "o",
    "151": "I",
    "152": "S",
    "153": "O",
    "154": "(",
    "155": ")",
    "156": " ",
    "157": "}",
    "158": "}",
    "159": "\"",
    "160": ",",
    "161": "\"",
    "162": "e",
    "163": "n",
    "164": "t",
    "165": "e",
    "166": "r",
    "167": "e",
    "168": "d",
    "169": "_",
    "170": "v",
    "171": "i",
    "172": "a",
    "173": "\"",
    "174": ":",
    "175": "\"",
    "176": "/",
    "177": "a",
    "178": "d",
    "179": "d",
    "180": "_",
    "181": "d",
    "182": "o",
    "183": "c",
    "184": "\"",
    "185": "}",
    "186": ",",
    "187": "\"",
    "188": "m",
    "189": "a",
    "190": "t",
    "191": "c",
    "192": "h",
    "193": "i",
    "194": "n",
    "195": "g",
    "196": "C",
    "197": "o",
    "198": "l",
    "199": "u",
    "200": "m",
    "201": "n",
    "202": "s",
    "203": "\"",
    "204": ":",
    "205": "[",
    "206": "\"",
    "207": "c",
    "208": "h",
    "209": "a",
    "210": "t",
    "211": "_",
    "212": "i",
    "213": "d",
    "214": "\"",
    "215": "]",
    "216": ",",
    "217": "\"",
    "218": "s",
    "219": "c",
    "220": "h",
    "221": "e",
    "222": "m",
    "223": "a",
    "224": "\"",
    "225": ":",
    "226": "[",
    "227": "{",
    "228": "\"",
    "229": "i",
    "230": "d",
    "231": "\"",
    "232": ":",
    "233": "\"",
    "234": "c",
    "235": "h",
    "236": "a",
    "237": "t",
    "238": "_",
    "239": "i",
    "240": "d",
    "241": "\"",
    "242": ",",
    "243": "\"",
    "244": "d",
    "245": "i",
    "246": "s",
    "247": "p",
    "248": "l",
    "249": "a",
    "250": "y",
    "251": "N",
    "252": "a",
    "253": "m",
    "254": "e",
    "255": "\"",
    "256": ":",
    "257": "\"",
    "258": "c",
    "259": "h",
    "260": "a",
    "261": "t",
    "262": "_",
    "263": "i",
    "264": "d",
    "265": "\"",
    "266": ",",
    "267": "\"",
    "268": "r",
    "269": "e",
    "270": "q",
    "271": "u",
    "272": "i",
    "273": "r",
    "274": "e",
    "275": "d",
    "276": "\"",
    "277": ":",
    "278": "t",
    "279": "r",
    "280": "u",
    "281": "e",
    "282": ",",
    "283": "\"",
    "284": "t",
    "285": "y",
    "286": "p",
    "287": "e",
    "288": "\"",
    "289": ":",
    "290": "\"",
    "291": "s",
    "292": "t",
    "293": "r",
    "294": "i",
    "295": "n",
    "296": "g",
    "297": "\"",
    "298": ",",
    "299": "\"",
    "300": "c",
    "301": "a",
    "302": "n",
    "303": "B",
    "304": "e",
    "305": "U",
    "306": "s",
    "307": "e",
    "308": "d",
    "309": "T",
    "310": "o",
    "311": "M",
    "312": "a",
    "313": "t",
    "314": "c",
    "315": "h",
    "316": "\"",
    "317": ":",
    "318": "t",
    "319": "r",
    "320": "u",
    "321": "e",
    "322": "}",
    "323": ",",
    "324": "{",
    "325": "\"",
    "326": "i",
    "327": "d",
    "328": "\"",
    "329": ":",
    "330": "\"",
    "331": "s",
    "332": "t",
    "333": "a",
    "334": "t",
    "335": "e",
    "336": "\"",
    "337": ",",
    "338": "\"",
    "339": "d",
    "340": "i",
    "341": "s",
    "342": "p",
    "343": "l",
    "344": "a",
    "345": "y",
    "346": "N",
    "347": "a",
    "348": "m",
    "349": "e",
    "350": "\"",
    "351": ":",
    "352": "\"",
    "353": "s",
    "354": "t",
    "355": "a",
    "356": "t",
    "357": "e",
    "358": "\"",
    "359": ",",
    "360": "\"",
    "361": "r",
    "362": "e",
    "363": "q",
    "364": "u",
    "365": "i",
    "366": "r",
    "367": "e",
    "368": "d",
    "369": "\"",
    "370": ":",
    "371": "f",
    "372": "a",
    "373": "l",
    "374": "s",
    "375": "e",
    "376": ",",
    "377": "\"",
    "378": "t",
    "379": "y",
    "380": "p",
    "381": "e",
    "382": "\"",
    "383": ":",
    "384": "\"",
    "385": "s",
    "386": "t",
    "387": "r",
    "388": "i",
    "389": "n",
    "390": "g",
    "391": "\"",
    "392": ",",
    "393": "\"",
    "394": "c",
    "395": "a",
    "396": "n",
    "397": "B",
    "398": "e",
    "399": "U",
    "400": "s",
    "401": "e",
    "402": "d",
    "403": "T",
    "404": "o",
    "405": "M",
    "406": "a",
    "407": "t",
    "408": "c",
    "409": "h",
    "410": "\"",
    "411": ":",
    "412": "f",
    "413": "a",
    "414": "l",
    "415": "s",
    "416": "e",
    "417": "}",
    "418": ",",
    "419": "{",
    "420": "\"",
    "421": "i",
    "422": "d",
    "423": "\"",
    "424": ":",
    "425": "\"",
    "426": "s",
    "427": "t",
    "428": "a",
    "429": "s",
    "430": "h",
    "431": "\"",
    "432": ",",
    "433": "\"",
    "434": "d",
    "435": "i",
    "436": "s",
    "437": "p",
    "438": "l",
    "439": "a",
    "440": "y",
    "441": "N",
    "442": "a",
    "443": "m",
    "444": "e",
    "445": "\"",
    "446": ":",
    "447": "\"",
    "448": "s",
    "449": "t",
    "450": "a",
    "451": "s",
    "452": "h",
    "453": "\"",
    "454": ",",
    "455": "\"",
    "456": "r",
    "457": "e",
    "458": "q",
    "459": "u",
    "460": "i",
    "461": "r",
    "462": "e",
    "463": "d",
    "464": "\"",
    "465": ":",
    "466": "f",
    "467": "a",
    "468": "l",
    "469": "s",
    "470": "e",
    "471": ",",
    "472": "\"",
    "473": "t",
    "474": "y",
    "475": "p",
    "476": "e",
    "477": "\"",
    "478": ":",
    "479": "\"",
    "480": "s",
    "481": "t",
    "482": "r",
    "483": "i",
    "484": "n",
    "485": "g",
    "486": "\"",
    "487": ",",
    "488": "\"",
    "489": "c",
    "490": "a",
    "491": "n",
    "492": "B",
    "493": "e",
    "494": "U",
    "495": "s",
    "496": "e",
    "497": "d",
    "498": "T",
    "499": "o",
    "500": "M",
    "501": "a",
    "502": "t",
    "503": "c",
    "504": "h",
    "505": "\"",
    "506": ":",
    "507": "f",
    "508": "a",
    "509": "l",
    "510": "s",
    "511": "e",
    "512": "}",
    "513": ",",
    "514": "{",
    "515": "\"",
    "516": "i",
    "517": "d",
    "518": "\"",
    "519": ":",
    "520": "\"",
    "521": "e",
    "522": "n",
    "523": "t",
    "524": "e",
    "525": "r",
    "526": "e",
    "527": "d",
    "528": "_",
    "529": "a",
    "530": "t",
    "531": "\"",
    "532": ",",
    "533": "\"",
    "534": "d",
    "535": "i",
    "536": "s",
    "537": "p",
    "538": "l",
    "539": "a",
    "540": "y",
    "541": "N",
    "542": "a",
    "543": "m",
    "544": "e",
    "545": "\"",
    "546": ":",
    "547": "\"",
    "548": "e",
    "549": "n",
    "550": "t",
    "551": "e",
    "552": "r",
    "553": "e",
    "554": "d",
    "555": "_",
    "556": "a",
    "557": "t",
    "558": "\"",
    "559": ",",
    "560": "\"",
    "561": "r",
    "562": "e",
    "563": "q",
    "564": "u",
    "565": "i",
    "566": "r",
    "567": "e",
    "568": "d",
    "569": "\"",
    "570": ":",
    "571": "f",
    "572": "a",
    "573": "l",
    "574": "s",
    "575": "e",
    "576": ",",
    "577": "\"",
    "578": "t",
    "579": "y",
    "580": "p",
    "581": "e",
    "582": "\"",
    "583": ":",
    "584": "\"",
    "585": "s",
    "586": "t",
    "587": "r",
    "588": "i",
    "589": "n",
    "590": "g",
    "591": "\"",
    "592": ",",
    "593": "\"",
    "594": "c",
    "595": "a",
    "596": "n",
    "597": "B",
    "598": "e",
    "599": "U",
    "600": "s",
    "601": "e",
    "602": "d",
    "603": "T",
    "604": "o",
    "605": "M",
    "606": "a",
    "607": "t",
    "608": "c",
    "609": "h",
    "610": "\"",
    "611": ":",
    "612": "f",
    "613": "a",
    "614": "l",
    "615": "s",
    "616": "e",
    "617": "}",
    "618": ",",
    "619": "{",
    "620": "\"",
    "621": "i",
    "622": "d",
    "623": "\"",
    "624": ":",
    "625": "\"",
    "626": "e",
    "627": "n",
    "628": "t",
    "629": "e",
    "630": "r",
    "631": "e",
    "632": "d",
    "633": "_",
    "634": "v",
    "635": "i",
    "636": "a",
    "637": "\"",
    "638": ",",
    "639": "\"",
    "640": "d",
    "641": "i",
    "642": "s",
    "643": "p",
    "644": "l",
    "645": "a",
    "646": "y",
    "647": "N",
    "648": "a",
    "649": "m",
    "650": "e",
    "651": "\"",
    "652": ":",
    "653": "\"",
    "654": "e",
    "655": "n",
    "656": "t",
    "657": "e",
    "658": "r",
    "659": "e",
    "660": "d",
    "661": "_",
    "662": "v",
    "663": "i",
    "664": "a",
    "665": "\"",
    "666": ",",
    "667": "\"",
    "668": "r",
    "669": "e",
    "670": "q",
    "671": "u",
    "672": "i",
    "673": "r",
    "674": "e",
    "675": "d",
    "676": "\"",
    "677": ":",
    "678": "f",
    "679": "a",
    "680": "l",
    "681": "s",
    "682": "e",
    "683": ",",
    "684": "\"",
    "685": "t",
    "686": "y",
    "687": "p",
    "688": "e",
    "689": "\"",
    "690": ":",
    "691": "\"",
    "692": "s",
    "693": "t",
    "694": "r",
    "695": "i",
    "696": "n",
    "697": "g",
    "698": "\"",
    "699": ",",
    "700": "\"",
    "701": "c",
    "702": "a",
    "703": "n",
    "704": "B",
    "705": "e",
    "706": "U",
    "707": "s",
    "708": "e",
    "709": "d",
    "710": "T",
    "711": "o",
    "712": "M",
    "713": "a",
    "714": "t",
    "715": "c",
    "716": "h",
    "717": "\"",
    "718": ":",
    "719": "f",
    "720": "a",
    "721": "l",
    "722": "s",
    "723": "e",
    "724": "}",
    "725": "]",
    "726": ",",
    "727": "\"",
    "728": "a",
    "729": "t",
    "730": "t",
    "731": "e",
    "732": "m",
    "733": "p",
    "734": "t",
    "735": "T",
    "736": "o",
    "737": "C",
    "738": "o",
    "739": "n",
    "740": "v",
    "741": "e",
    "742": "r",
    "743": "t",
    "744": "T",
    "745": "y",
    "746": "p",
    "747": "e",
    "748": "s",
    "749": "\"",
    "750": ":",
    "751": "f",
    "752": "a",
    "753": "l",
    "754": "s",
    "755": "e",
    "756": ",",
    "757": "\"",
    "758": "c",
    "759": "o",
    "760": "n",
    "761": "v",
    "762": "e",
    "763": "r",
    "764": "t",
    "765": "F",
    "766": "i",
    "767": "e",
    "768": "l",
    "769": "d",
    "770": "s",
    "771": "T",
    "772": "o",
    "773": "S",
    "774": "t",
    "775": "r",
    "776": "i",
    "777": "n",
    "778": "g",
    "779": "\"",
    "780": ":",
    "781": "t",
    "782": "r",
    "783": "u",
    "784": "e",
    "785": "}",
    "mappingMode": "autoMapInputData",
    "value": {},
    "matchingColumns": [],
    "schema": [
      {
        "id": "chat_id",
        "displayName": "chat_id",
        "required": false,
        "defaultMatch": false,
        "display": true,
        "type": "string",
        "canBeUsedToMatch": true,
        "removed": false
      },
      {
        "id": "state",
        "displayName": "state",
        "required": false,
        "defaultMatch": false,
        "display": true,
        "type": "string",
        "canBeUsedToMatch": true,
        "removed": false
      },
      {
        "id": "stash",
        "displayName": "stash",
        "required": false,
        "defaultMatch": false,
        "display": true,
        "type": "string",
        "canBeUsedToMatch": true,
        "removed": false
      },
      {
        "id": "entered_at",
        "displayName": "entered_at",
        "required": false,
        "defaultMatch": false,
        "display": true,
        "type": "string",
        "canBeUsedToMatch": true,
        "removed": false
      },
      {
        "id": "entered_via",
        "displayName": "entered_via",
        "required": false,
        "defaultMatch": false,
        "display": true,
        "type": "string",
        "canBeUsedToMatch": true,
        "removed": false
      }
    ],
    "attemptToConvertTypes": false,
    "convertFieldsToString": false
  },
  "options": {
    "cellFormat": "USER_ENTERED"
  }
}
```

---

## Add Doc Init Reply

- **Node type:** `n8n-nodes-base.set`
- **Type version:** 3.4
- **Position:** [3008, 1152]
- **Inbound:**
  - from `Add Doc Init Set State` → input 0
- **Outbound:**
  - output 0 → `Send Reply`

### Parameters

```json
{
  "assignments": {
    "assignments": [
      {
        "id": "1",
        "name": "reply_text",
        "value": "Iltimos, indekslash uchun PDF, MD yoki TXT fayl yuboring (yoki /cancel bilan bekor qiling).",
        "type": "string"
      }
    ]
  },
  "options": {}
}
```

---

## Add Doc Waiting Reply

- **Node type:** `n8n-nodes-base.set`
- **Type version:** 3.4
- **Position:** [3008, 1344]
- **Inbound:**
  - from `Route Request` → input 0
- **Outbound:**
  - output 0 → `Send Reply`

### Parameters

```json
{
  "assignments": {
    "assignments": [
      {
        "id": "1",
        "name": "reply_text",
        "value": "Iltimos, fayl yuboring (PDF, MD, yoki TXT). Yoki /cancel bilan bekor qiling.",
        "type": "string"
      }
    ]
  },
  "options": {}
}
```

---

## Add Doc File Get File

- **Node type:** `n8n-nodes-base.telegram`
- **Type version:** 1.2
- **Position:** [1344, 1696]
- **Inbound:**
  - from `Route Request` → input 0
- **Outbound:**
  - output 0 → `Add Doc File Upload to Drive`

### Parameters

```json
{
  "resource": "file",
  "fileId": "={{ $('Parse Input').item.json.file_id }}",
  "additionalFields": {}
}
```

---

## Add Doc File Upload to Drive

- **Node type:** `n8n-nodes-base.googleDrive`
- **Type version:** 3
- **Position:** [1568, 1696]
- **Inbound:**
  - from `Add Doc File Get File` → input 0
- **Outbound:**
  - output 0 → `Add Doc Insert Vector Store`

### Parameters

```json
{
  "name": "={{ ($('Parse Input').item.json.file_name || ('telegram-' + $('Parse Input').item.json.file_id)) + ' uploaded by ' + $('Parse Input').item.json.chat_id + ' at ' + $now.toFormat('yyyy-MM-dd_HH-mm-ss') }}",
  "driveId": {
    "__rl": true,
    "mode": "list",
    "value": "My Drive"
  },
  "folderId": {
    "__rl": true,
    "mode": "id",
    "value": "1cPPP9FSi3Znoetgth69RA-2gvxbYdHjR"
  },
  "options": {
    "simplifyOutput": true
  }
}
```

---

## Add Doc Insert Vector Store

- **Node type:** `@n8n/n8n-nodes-langchain.vectorStoreInMemory`
- **Type version:** 1.3
- **Position:** [1792, 1696]
- **Inbound:**
  - from `Add Doc File Upload to Drive` → input 0
  - from `Add Doc Gemini Embeddings` → input 0 *(via ai_embedding)*
  - from `Add Doc Data Loader` → input 0 *(via ai_document)*
- **Outbound:**
  - output 0 → `Add Doc Build Row`

### Parameters

```json
{
  "mode": "insert",
  "memoryKey": {
    "__rl": true,
    "mode": "list",
    "value": "bank_pdf_corpus",
    "cachedResultName": "bank_pdf_corpus"
  }
}
```

---

## Add Doc Gemini Embeddings

- **Node type:** `@n8n/n8n-nodes-langchain.embeddingsGoogleGemini`
- **Type version:** 1
- **Position:** [1808, 1920]
- **Inbound:** *(none — entry point)*
- **Outbound:**
  - output 0 *(via ai_embedding)* → `Add Doc Insert Vector Store`

### Parameters

```json
{
  "modelName": "models/gemini-embedding-001"
}
```

---

## Add Doc Data Loader

- **Node type:** `@n8n/n8n-nodes-langchain.documentDefaultDataLoader`
- **Type version:** 1.1
- **Position:** [1936, 1920]
- **Inbound:**
  - from `Add Doc Text Splitter` → input 0 *(via ai_textSplitter)*
- **Outbound:**
  - output 0 *(via ai_document)* → `Add Doc Insert Vector Store`

### Parameters

```json
{
  "dataType": "binary",
  "textSplittingMode": "custom",
  "options": {
    "metadata": {
      "metadataValues": [
        {
          "name": "source_filename",
          "value": "={{ $('Add Doc File Upload to Drive').item.json.name }}"
        },
        {
          "name": "drive_file_id",
          "value": "={{ $('Add Doc File Upload to Drive').item.json.id }}"
        },
        {
          "name": "uploaded_by",
          "value": "={{ $('Parse Input').item.json.chat_id }}"
        },
        {
          "name": "upload_source",
          "value": "telegram_admin"
        }
      ]
    }
  }
}
```

---

## Add Doc Text Splitter

- **Node type:** `@n8n/n8n-nodes-langchain.textSplitterRecursiveCharacterTextSplitter`
- **Type version:** 1
- **Position:** [1936, 2128]
- **Inbound:** *(none — entry point)*
- **Outbound:**
  - output 0 *(via ai_textSplitter)* → `Add Doc Data Loader`

### Parameters

```json
{
  "chunkSize": 800,
  "chunkOverlap": 120,
  "options": {}
}
```

---

## Add Doc Build Row

- **Node type:** `n8n-nodes-base.set`
- **Type version:** 3.4
- **Position:** [2144, 1696]
- **Inbound:**
  - from `Add Doc Insert Vector Store` → input 0
- **Outbound:**
  - output 0 → `Add Doc Append to Documents`

### Parameters

```json
{
  "assignments": {
    "assignments": [
      {
        "id": "1",
        "name": "doc_id",
        "value": "={{ \"T-\" + $now.toFormat(\"yyyyMMdd\") + \"-\" + Math.random().toString(36).substring(2, 6).toUpperCase() }}",
        "type": "string"
      },
      {
        "id": "2",
        "name": "title",
        "value": "={{ ($('Parse Input').item.json.file_name || $('Add Doc File Upload to Drive').item.json.name || 'untitled').replace(/\\.(pdf|md|txt)$/i, '') }}",
        "type": "string"
      },
      {
        "id": "3",
        "name": "original_filename",
        "value": "={{ $('Parse Input').item.json.file_name }}",
        "type": "string"
      },
      {
        "id": "4",
        "name": "drive_url",
        "value": "={{ 'https://drive.google.com/file/d/' + $('Add Doc File Upload to Drive').item.json.id + '/view' }}",
        "type": "string"
      },
      {
        "id": "5",
        "name": "drive_file_id",
        "value": "={{ $('Add Doc File Upload to Drive').item.json.id }}",
        "type": "string"
      },
      {
        "id": "6",
        "name": "chunk_count",
        "value": "={{ Array.isArray($json) ? $json.length : ($json.chunksAdded || $json.documentsCount || 0) }}",
        "type": "number"
      },
      {
        "id": "7",
        "name": "embedding_model",
        "value": "models/gemini-embedding-001",
        "type": "string"
      },
      {
        "id": "8",
        "name": "vector_store_namespace",
        "value": "bank_pdf_corpus",
        "type": "string"
      },
      {
        "id": "9",
        "name": "added_at",
        "value": "={{ $now.toISO() }}",
        "type": "string"
      },
      {
        "id": "10",
        "name": "added_by",
        "value": "={{ $('Parse Input').item.json.chat_id }}",
        "type": "string"
      },
      {
        "id": "11",
        "name": "status",
        "value": "active",
        "type": "string"
      }
    ]
  },
  "options": {}
}
```

---

## Add Doc Append to Documents

- **Node type:** `n8n-nodes-base.googleSheets`
- **Type version:** 4.7
- **Position:** [2368, 1696]
- **Inbound:**
  - from `Add Doc Build Row` → input 0
- **Outbound:**
  - output 0 → `Add Doc Clear State`

### Parameters

```json
{
  "operation": "append",
  "documentId": {
    "__rl": true,
    "mode": "id",
    "value": "1qsiZkdGyFepZyqFB7g38mfuK6J3Y7-SuNPw0RkmjI8c"
  },
  "sheetName": {
    "__rl": true,
    "mode": "name",
    "value": "Documents"
  },
  "columns": "{\"mappingMode\":\"autoMapInputData\",\"value\":{},\"matchingColumns\":[],\"schema\":[],\"attemptToConvertTypes\":false,\"convertFieldsToString\":false}",
  "options": {
    "cellFormat": "USER_ENTERED",
    "useAppend": true
  }
}
```

---

## Add Doc Clear State

- **Node type:** `n8n-nodes-base.googleSheets`
- **Type version:** 4.7
- **Position:** [2688, 1696]
- **Inbound:**
  - from `Add Doc Append to Documents` → input 0
- **Outbound:**
  - output 0 → `Add Doc File Reply`

### Parameters

```json
{
  "operation": "appendOrUpdate",
  "documentId": {
    "__rl": true,
    "mode": "id",
    "value": "1qsiZkdGyFepZyqFB7g38mfuK6J3Y7-SuNPw0RkmjI8c"
  },
  "sheetName": {
    "__rl": true,
    "mode": "name",
    "value": "AdminStates"
  },
  "columns": "{\"mappingMode\":\"defineBelow\",\"value\":{\"chat_id\":\"={{ $('Parse Input').item.json.chat_id }}\",\"state\":\"IDLE\",\"stash\":\"\",\"entered_at\":\"={{ $now.toISO() }}\",\"entered_via\":\"admin_add_doc_done\"},\"matchingColumns\":[\"chat_id\"],\"schema\":[{\"id\":\"chat_id\",\"displayName\":\"chat_id\",\"required\":true,\"type\":\"string\",\"canBeUsedToMatch\":true},{\"id\":\"state\",\"displayName\":\"state\",\"required\":false,\"type\":\"string\",\"canBeUsedToMatch\":false},{\"id\":\"stash\",\"displayName\":\"stash\",\"required\":false,\"type\":\"string\",\"canBeUsedToMatch\":false},{\"id\":\"entered_at\",\"displayName\":\"entered_at\",\"required\":false,\"type\":\"string\",\"canBeUsedToMatch\":false},{\"id\":\"entered_via\",\"displayName\":\"entered_via\",\"required\":false,\"type\":\"string\",\"canBeUsedToMatch\":false}],\"attemptToConvertTypes\":false,\"convertFieldsToString\":true}",
  "options": {
    "cellFormat": "USER_ENTERED"
  }
}
```

---

## Add Doc File Reply

- **Node type:** `n8n-nodes-base.set`
- **Type version:** 3.4
- **Position:** [3008, 1696]
- **Inbound:**
  - from `Add Doc Clear State` → input 0
- **Outbound:**
  - output 0 → `Send Reply`

### Parameters

```json
{
  "assignments": {
    "assignments": [
      {
        "id": "1",
        "name": "reply_text",
        "value": "={{ 'Indekslandi: ' + $('Add Doc Build Row').item.json.title + '\\nID: ' + $('Add Doc Build Row').item.json.doc_id + '\\nChunks: ' + $('Add Doc Build Row').item.json.chunk_count }}",
        "type": "string"
      }
    ]
  },
  "options": {}
}
```

---
