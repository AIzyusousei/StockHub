export type HeatmapItem = {
  name: string;
  change: number;
  size: number;
  sector: string;
};

export const heatmapItems: HeatmapItem[] = [
  { name: "トヨタ自動車", change: 2.34, size: 18, sector: "輸送用機器" },
  { name: "三菱重工業", change: 3.21, size: 17, sector: "電気機器" },
  { name: "ソニーG", change: 1.83, size: 13, sector: "電気機器" },
  { name: "任天堂", change: -1.25, size: 12, sector: "その他製品" },
  { name: "アドバンテスト", change: -0.91, size: 8, sector: "電気機器" },
  { name: "キーエンス", change: 2.75, size: 15, sector: "電気機器" },
  { name: "東京エレクトロン", change: 2.12, size: 13, sector: "電気機器" },
  { name: "日立製作所", change: 0.78, size: 10, sector: "電気機器" },
  { name: "ファナック", change: -0.64, size: 9, sector: "電気機器" },
  { name: "三菱UFJ", change: 1.42, size: 12, sector: "銀行業" },
  { name: "三井住友FG", change: 1.18, size: 10, sector: "銀行業" },
  { name: "みずほFG", change: 0.55, size: 8, sector: "銀行業" },
  { name: "第一三共", change: -0.82, size: 10, sector: "医薬品" },
  { name: "NTT", change: 0.92, size: 9, sector: "情報・通信" },
  { name: "KDDI", change: 0.67, size: 8, sector: "情報・通信" },
  { name: "ソフトバンクG", change: 0.31, size: 8, sector: "情報・通信" },
  { name: "中外製薬", change: -0.53, size: 8, sector: "医薬品" },
  { name: "信越化学", change: 1.35, size: 7, sector: "化学" },
  { name: "ダイキン工業", change: 0.88, size: 6, sector: "機械" },
  { name: "SMC", change: 0.62, size: 6, sector: "機械" },
  { name: "伊藤忠商事", change: 0.05, size: 6, sector: "卸売業" },
  { name: "住友商事", change: -0.12, size: 6, sector: "卸売業" },
  { name: "三井物産", change: -0.28, size: 6, sector: "卸売業" },
  { name: "NVDA", change: 2.89, size: 9, sector: "電気機器" },
  { name: "AVGO", change: 2.46, size: 8, sector: "電気機器" },
  { name: "AAPL", change: 0.87, size: 8, sector: "情報・通信" },
  { name: "MSFT", change: 0.62, size: 8, sector: "情報・通信" },
  { name: "AMZN", change: 0.93, size: 8, sector: "小売業" },
  { name: "TSLA", change: -1.3, size: 8, sector: "輸送用機器" },
];
