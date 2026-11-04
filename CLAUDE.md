# 信用 5C 財務風險診斷（credit-5c-risk-diagnosis）

中小企業財務風險診斷（12 種產業：一般、農業、食品、零售、餐飲、製造、批發貿易、營建、物流、旅宿、服務、電商）：以銀行放款角度，用信用 5C＋財務比率＋「創業十大避免」評估值不值得借錢。純前端靜態網頁。

- 檔案：`index.html`（全部 UI 與邏輯）、`data.js`（欄位、比率門檻、`INDUSTRIES` 產業門檻覆寫 `adj` 與質化題提示 `hint`、5C 質化題、十大避免、15 個虛構範例，`d.ind` 指定產業）、`manual.html`（由 `node tools/build_manual.js` 用 `tools/manual_body.html` 產生，創作者區塊取自 `互動遊戲/taiwan-bird-atlas/tools/manual_tpl.html`——**改 data.js 後要重跑**）、`tools/make_icons.py`（PIL 產生 PWA 圖示）。
- 本機預覽 port **8849**（`.claude/launch.json` 的 `credit-5c-risk-diagnosis`）。
- 上線：GitHub Pages（Actions workflow，master 分支）https://m255525.github.io/credit-5c-risk-diagnosis/
- 標準配備：創作者資訊、操作手冊、使用警語（頁面 warnbar＋首訪跳出，`c5rd_warned`）、PWA、訪客計數器（`m255525.credit5criskdiagnosis`）、共用跑馬燈（滑鼠移入暫停；**必備、不提供關閉開關**）、⚙ 常用設定（收合式 `.set-sec`）。無序號、無 AI 金鑰（只提供「複製提示詞」）。
- PDF 浮水印：`#pdfWatermark` 內嵌馬克老師去背圖（base64），`@media print` 才顯示、每頁重複；列印隱藏規則要排除它。
- localStorage 前綴 `c5rd_`。

## 評分邏輯（改動時注意）
- 比率分數：`pts=[最差,警戒,良好,最佳]` → `[0,40,75,100]` 線性內插；`dir=-1` 越小越好。
- 5C：品格＝質化平均；能力＝DSCR×2、新增後DSCR×2、利息保障×1.5…；資本＝負債比×1.5…；擔保品＝可貸放值覆蓋率＋保證人加分；條件＝質化 55%＋比率 45%。權重可在設定調整。
- 紅旗上限：退票／淨值為負 → 45；新增後 DSCR<1、CFO<0 且現金<應還本金 → 64。
- 建議額度：DSCR 1.25 下的可負擔年本息 × 年金現值因子；C 級再依擔保下修、D 級 0。
- 十大避免**不扣分**（避免與比率重複計算），只列入意見書；清單文字可在設定改寫，自動規則依列序對應。
- 產業門檻：`ptsOf(def)` 先取 `curInd().adj[k]` 再退回通用 `pts`；比率表標「產業調整」。十大避免的存貨／收款／毛利／速動偵測與授信條件改用比率燈號（lv／分數），會跟著產業門檻變。評等用四捨五入後的分數判定。
- 15 個範例分布：A＝禾豐、鄰里超市、精工金屬；B＝綠野、青田、好食光、順通物流、山嵐旅館、點子行銷；C＝金穗、巷口手搖飲、宏遠貿易；D＝海灣、好物電商、新鴻營造。改數字或門檻後要重跑確認分布仍合理。
- 「創業十大避免」原始課程內容（11/03）在本機與 Drive 都找不到，預設清單為自行整理，介面說明可改寫。
