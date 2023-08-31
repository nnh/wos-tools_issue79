// nonNHOUtils.js
const { getPrefecturalHosp, getCityHosp } = require("./localGovernment");
const { getUnivNames } = require("./univ");
const { getRosaiHosp } = require("./rosaiHosp");
const { getRedCross } = require("./redCross");
const { getGovernment } = require("./government");
const { getJcho } = require("./jcho");
const { getKyosai } = require("./kyosai");
const { getKouseiren } = require("./kouseiren");
const { getCompany } = require("./company");
const { getSaiseikai } = require("./saiseikai");

function getNonNHOFacilitiesOrganizations() {
  return [
    /saiseikai /,
    /tsukuba gakuen hosp/,
    /astrazeneca/,
    /japanese fdn canc res/, //公益財団法人がん研究会
    /kanagawa canc ctr/, // 神奈川県立がんセンター
    /crlcc rene gauducheau/,
    /ctr dev canc therapeut/,
    /mary potter oncol ctr/,
    /max planck inst evolutionary anthropol/,
    /okinawa inst sci & technol/,
    /natl inst biomed innovat/,
    /kanagawa cardiovasc & resp ctr/,
    /ibaraki seinan med ctr hosp/,
    /kobari gen hosp/,
    /fed med biol agcy/,
    /tokyo seiei coll/,
    /ntt tokyo med ctr/,
    /hitachinaka gen hosp/,
    /dna chip res inc/,
  ];
}
function getNonNHOFacilitiesFullAddress() {
  const univ = getUnivNames();
  const rosaiHosp = getRosaiHosp();
  const redCross = getRedCross();
  const prefecturalHosp = getPrefecturalHosp();
  const cityHosp = getCityHosp();
  const government = getGovernment();
  const jcho = getJcho();
  const kyosai = getKyosai();
  const kouseiren = getKouseiren();
  const company = getCompany();
  const saiseikai = getSaiseikai();
  const hospNames = [
    /tsukuba gakuen hosp/,
    /japanese fdn canc res, /, //公益財団法人がん研究会
    /matsuda hosp, dept orthopaed surg, izumi ku, 17-1 tatsutayashiki, sendai, miyagi 9813217, japan/,
    /matsuda hosp, dept orthopaed surg, 17-1 tatsutayashiki,izumi ku, sendai 9813217, japan/,
    /sendai orthopaed hosp, dept orthopaed surg, wakabayashi ku, 3-5-3 izai, sendai, miyagi 9840038, japan/, // 特定医療法人白嶺会 仙台整形外科病院
    /kobari gen hosp/, // 医療法人社団圭春会 小張総合病院
    /toyoda eisei hosp/, // 医療法人 社団 恵成会 豊田えいせい病院
    /hamamatsu med photon fdn, hamamatsu pet imaging ctr/, // 光尖端医学教育研究センター
    /ogikubo hosp/, // 医療法人財団 荻窪病院
    /fukuoka sanno hosp/, // 福岡山王病院
    /komazawa hosp/, // 一般財団法人 平和協会 駒沢病院
    /kinashi obayashi hosp/, // 医療法人財団博仁会 キナシ大林病院
    /fujisawa childrens clin/, // 藤沢こどもクリニック
    /kinki cent hosp/, // 近畿中央病院
    /sendai kousei hosp/, // 仙台厚生病院
    /tsukuba mem hosp/, // 医療法人社団筑波記念会 筑波記念病院
    /osaka police hosp/,
    /kobe ekisaikai hosp/,
    /amagasaki cent hosp/, // 社会医療法人中央会 尼崎中央病院
    /lateral epicondylitis clin practice guidelines de, tokyo, japan/, // 外側上顆炎診療ガイドライン
    /shonan cent hosp/, // 医療法人社団若林会 湘南中央病院
    /iyo hosp, dept internal med, iyo, japan/, // 伊予病院
    /ohashi clin participate gastro enterol & ano proct, niihama, japan/, // 大橋胃腸肛門科外科医院
    /ohashi clin participate gastroenterol & ano proct, niihama, ehime 7922856, japan/,
    /fukushima daiich hosp/, // 社会医療法人福島厚生会福島第一病院
    /shonan kamakura gen hosp/, // 医療法人徳洲会 湘南鎌倉総合病院
    /okanami gen hosp/, // 社会医療法人 畿内会 岡波総合病院
    /niigata rinko hosp/, // 医療法人新潟臨港保健会 新潟臨港病院
    /midori hosp, dept neurol, niigata/, // 総合リハビリテーションセンター・みどり病院
    /sannochou hosp/, // 社会医療法人 嵐陽会 三之町病院
    /niigata neurosurg hosp/, // 医療法人泰庸会新潟脳外科病院
    /canc inst hosp/, // 公益財団法人がん研究会 有明病院
    /canc inst ariake hosp, /,
    /ichinomiya nishi hosp/, // 一宮西病院 | 社会医療法人 杏嶺会
    /iwai orthopaed med hosp/, // 医療法人財団　岩井医療財団　岩井整形外科病院
    /tokyo bay urayasu ichikawa med ctr/, // 公益社団法人地域医療振興協会東京ベイ・浦安市川医療センター
    /tokyo bay urayasu ichikawa, dept emergency & crit care med, med ctr, 3-4-32 todaijima, urayasu, chiba 2790001, japan/,
    /japanese soc canc colon & rectum/, // 大腸癌研究会
    /fdn biomed res & innovat kobe, translat res ctr med innovat, kobe, hyogo, japan/, // TRI 医療イノベーション推進センター
    /sapporo dermatopathol inst, sapporo, hokkaido, japan/,
    /fukumoto dermatopathol clin, nara, japan/,
    /itabashi cent clin lab, dept pathol, tokyo, japan/,
    /higashiyamato hosp/, // 社会医療法人財団大和会東大和病院
    /urawa kyosai hosp/, // 医療法人財団 博仁会 共済病院
    /oita san ai med ctr/, // 大分三愛メディカルセンター｜社会医療法人 三愛会
    /mishima hosp, niigata/, // 特定医療法人楽山会 三島病院
    /kofu neurosurg hosp/, // 医療法人社団篠原会 甲府脳神経外科病院
    /kurumi clin/,
    /nitobe mem nakano gen hosp/, // 東京医療生活協同組合 新渡戸記念中野総合病院
    /asahikawa keisenkai hosp/,
    /seiyu mem hosp/, // 医療法人　誠佑記念病院
    /sakakibara heart inst/, // 公益財団法人日本心臓血圧研究振興会榊原記念病院
    /kyowakai med corp, dept urol, kyoritsu hosp, tokyo, japan/, // 協立病院（医療法人 協和会）
    /matsunami gen hosp/, // 社会医療法人蘇西厚生会松波総合病院
    /ohta nishinouchi hosp/, // 一般財団法人太田綜合病院附属太田西ノ内病院
    /japan antitb assoc/, // 公益財団法人結核予防会
    /mihara mem hosp/, // 公益財団法人 脳血管研究所 美原記念病院
    /koga gen hosp/, // 社会医療法人同心会 古賀総合病院
    /aisenkai nichinan hosp/, // 愛泉会日南病院
    /hakodate goryoukaku hosp/, // 社会福祉法人 函館厚生院 函館五稜郭病院
    /nagayama rheumatol & orthopaed clin/, // 永山リウマチ整形外科
    /chiba qiball clin/, // 千葉きぼーるクリニック
    /1750-1 ikenobe, miki, kagawa 7610793, japan/,
    /kurashiki cent hosp/, // 公益財団法人大原記念倉敷中央医療機構 倉敷中央病院
    /kitano hosp/, // 公益財団法人田附興風会 医学研究所北野病院
    /kyoto katsura hosp/, // 社会福祉法人 京都社会事業財団　京都桂病院
    /nishina med clin/, // 仁科医院
    /otomo rheumatol clin/, // 世田谷調布大友内科リウマチ科千歳烏山院
    /kameda med ctr/, // 医療法人鉄蕉会 亀田総合病院
    /suzuka kaisei hosp/, // 社会医療法人 峰和会 鈴鹿回生病院
    /hokkaido cardiovasc hosp/, // 社会医療法人　北海道循環器病院
    /katsushika rehabil hosp/, // 社会医療法人社団正志会葛飾リハビリテーション病院
    /nisshin orido hosp/, // 医療法人 大医会 日進おりど病院
    /osada hosp/, // 医療法人社団  成仁会  長田病院
    /bellland gen hosp/, // 社会医療法人生長会ベルランド総合病院
    /tesseikai neurosurg hosp/, // 畷生会脳神経外科病院
    /toyosato hosp/, // 公益財団法人 豊郷病院
    /kohnan hosp/, // 医療法人社団仁生会 甲南病院
    /iyo hosp/, // 医療法人財団尚温会　伊予病院
    /mitsui mem hosp/, // 社会福祉法人 三井記念病院
    /kawasaki heart ctr, dept cardiovasc surg, tokushima, japan/,
    /fukuoka kinen hosp/, // 社会医療法人大成会 福岡記念病院
    /tsukuba med ctr/, // 公益財団法人　筑波メディカルセンター
    /nikko mem hosp/, // 社会医療法人母恋日鋼記念病院
    /harasanshin hosp/, // 医療法人原三信病院
    /nakadori gen hosp/, // 社会医療法人明和会中通総合病院
    /hokkaido gastroenterol hosp/, // 医療法人 彰和会 北海道消化器科病院
    /tomakomai nisshou hosp/, // 医療法人社団 養生館｜苫小牧日翔病院
    /teine keijinkai hosp/,
    /nagoya sports clin/,
    /kumamoto shinto gen hosp/, // 医療法人創起会 くまもと森都総合病院
    /pl gen hosp/, // 医療法人宝生会ＰＬ病院
    /fujii masao mem hosp/, // 藤井政雄記念病院 ／仁厚会
    /toyoda ent clin, maebashi, gumma, japan/, // とよだクリニック
    /houju mem hosp/, // 医療法人社団 和楽仁 芳珠記念病院
    /seirei mikatahara gen hosp/, // 総合病院 聖隷三方原病院
    /shin yurigaoka gen hosp/, // 医療法人社団三成会新百合ヶ丘総合病院
    /toyohashi heart ctr/, // 医療法人 澄心会 豊橋ハートセンター
    /geriatr res inst & hosp/, // 公益財団法人老年病研究所附属病院
    /sakai sakibana hosp/, // 堺咲花病院｜社会医療法人 啓仁会
    /nagae prostate clin/, // ながえ前立腺ケアクリニック
    /iclin, sapporo, hokkaido, japan/,
    /fukushima daiichi hosp/, // 社会医療法人福島厚生会 福島第一病院
    /ishikawa gastroenterol clin/, // 医療法人いちょう会　石川消化器内科
    /high energy accelerator res org/, // 高エネルギー加速器研究機構
    /nagasaki kita hosp/, // 長崎北病院-社会医療法人 春回会グループ
    /kurashiki med ctr/, // 一般財団法人倉敷成人病センター
    /yasuda hosp, dept gynecol, hiroshima, japan/, // 医療法人社団 仁慈会 安田病院
    /hirata womens clin, hiroshima, japan/, // ひらた女性クリニック
    /oita sanai med ctr/, // 大分三愛メディカルセンター｜社会医療法人 三愛会
    /atr neural informat anal labs, dept computat brain imaging/, // ATR 脳情報通信総合研究所
    /kinoshita clin, hiroshima, japan/,
    /ozono clin, internal med & cardiol, hiroshima, japan/,
    /nakamaru clin, hiroshima, japan/,
    /ninomiya clin, hiroshima, japan/,
    /oiwa naika, hiroshima, japan/,
    /kawagoe clin cardiol, hiroshima, japan/,
    /yoshida cardiol clin, hiroshima, japan/,
    /matsumoto cardiovasc med clin, hiroshima, japan/,
    /fukunaga cardiol clin, hiroshima, japan/,
    /mazuda hosp, dept cardiol, hiroshima, japan/,
    /tsuchiya gen hosp, akane fdn, cardiovasc ctr, div cardiol, hiroshima, japan/, // 医療法人 あかね会土谷総合病院
    /tsukuba vasc ctr/, // 医療法人慶友会　つくば血管センター
    /kyoundo hosp/, // 公益財団法人 佐々木研究所附属 杏雲堂病院
    /sendai kosei hosp/, // 一般財団法人厚生会 仙台厚生病院
    /oda gi endoscopy & gastroenterol clin, kumamoto, japan/,
    /hakuai hosp/, // 社会医療法人同愛会　博愛病院
    /seirei hamamatsu gen hosp/, //社会福祉法人聖隷福祉事業団総合病院聖隷浜松病院
    /shintoshi hosp/, // 新都市病院｜医療法人社団 明徳会
    /mito chuo hosp/, // 社会医療法人財団　古宿会 水戸中央病院
    /tsukuha med ctr hosp, tsukuba, ibaraki, japan/, // 公益財団法人　筑波メディカルセンター 筑波メディカルセンター病院
    /umemoto childrens clin, tsu, mie, japan/,
    /sotobo childrens clin, chiba, japan/,
    /nagoya kyoritsu hosp/, // 医療法人偕行会 名古屋共立病院
    /kawashima neurol clin, fujisawa, japan/,
    /southern tohoku med clin, koriyama, japan/, // 一般財団法人脳神経疾患研究所附属総合南東北病院
    /takatsuki gen hosp, dept neurol, takatsuki, japan/, // 社会医療法人愛仁会　高槻病院
    /kakegawa higashi hosp/, // 医療法人社団 綾和会 掛川東病院
    /fmc tokyo clin, med informat & genet counseling div, tokyo, japan/, // FMC東京クリニック
    /urasoe gen hosp/, // 社会医療法人仁愛会浦添総合病院
    /ryusei hosp/, // 一般財団法人琉球生命済生会 琉生病院
    /nagoya mem hosp/, // 社会医療法人名古屋記念財団 	名古屋記念病院
    /moriya daiichi gen hosp/, // 社会医療法人社団光仁会 総合守谷第一病院
    /keiyukai sapporo hosp/, // 社会医療法人恵佑会札幌病院
    /aihara clin, hirosaki, aomori, japan/,
    /matsumura dent clin, fukuoka, japan/,
    /sapporo hokuyu hosp/, // 社会医療法人北楡会　札幌北楡病院
    /japan canc survivorship network, tokyo, japan/,
    /kihara cardiovasc clin/, // 医療法人社団幾晃会 木原循環器科内科医院
    /minamino cardiovasc hosp/, // 医療法人社団健心会　みなみ野循環器病院
    /iwasa hosp, dept internal med, gifu, japan/, // 岩佐医院
    /okayama east neurosurg hosp/, // 医療法人　幸義会 岡山東部脳神経外科
    /specified clin soyokaze cardiovasc med & diabet c, dept cardiovasc med, matsuyama, ehime, japan/, // そよかぜ循環器内科・糖尿病内科
    /akaiwa med assoc hosp/, // 赤磐医師会病院
    /minagawa cardiovasc clin, dept internal med, gifu, japan/, // みながわ内科・循環器科クリニック
    /kawagoe ear inst, div otorhinolaryngol, kawagoe, saitama, japan/, // 川越耳鼻咽喉科医院
    /kitada resp clin, osaka, japan/,
    /tsuyama cent hosp, dept internal med, okayama, japan/, // 津山慈風会 津山中央病院
    /narita mem hosp/, // 成田記念病院 社会医療法人 明陽会
    /kariya toyota gen hosp/, // 医療法人豊田会 刈谷豊田総合病院
    /aiiku hosp/, // 医療法人菊郷会 愛育病院
    /kin ikyo chuo hosp/, // 公益社団法人北海道勤労者医療協会 勤医協中央病院
    /konan med ctr/, // 公益財団法人 甲南会 甲南医療センター
    /ebina gen hosp/, // 社会医療法人ジャパンメディカルアライアンス 海老名総合病院
    /masuko mem hosp/, // 医療法人衆済会 増子記念病院
    /toyohashi mates clin/, // 医療法人社団三遠メディメイツ 豊橋メイツクリニック
    /kobe minimally invas canc ctr/, // 医療法人社団　神戸低侵襲がん医療センター
    /kitakyusyu gen hosp/, // 社会医療法人 北九州病院 北九州総合病院
    /dpat secretariat/, // DPAT事務局
    /kusatsu gen hosp/, // 社会医療法人誠光会 淡海医療センター
    /omi med ctr, kusatsu, japan/,
    /hino mem hosp/, // 医療法人社団 昴会 日野記念病院
    /heisei med welf grp, oouchi hosp/, // 医療法人社団 大和会 大内病院
    /asahi neurol & rehabil hosp/, // 医療法人社団弥生会旭神経内科リハビリテーション病院
    /karada internal med clin/, // KARADA（からだ）内科クリニック
    /deguchi pediat clin, omura, japan/, // キッズ＆ファミリークリニック　出口小児科医院
    /st marys hosp/, // 社会医療法人 雪の聖母会 聖マリア病院
    /home palliat care asunaro clin/, // 在宅緩和ケア あすなろ医院
    /matsuyama bethel hosp/, // 医療法人聖愛会　松山ベテル病院
    /hatsukaichi mem hosp/, // 社会医療法人 清風会 廿日市記念病院
    /musashino gen hosp/, // 医療法人 ユーカリ 武蔵野総合病院
    /amagasaki chuo hosp/, // 社会医療法人社団　中央会　尼崎中央病院
    /kawachi gen hosp/, // 医療法人河内友紘会 河内総合病院
    /sumitomo hosp/, // 一般財団法人　住友病院
    /kano gen hosp/, // 医療法人協和会加納総合病院
    /sakurabashi watanabe hosp/, // 医療法人 渡辺医学会　桜橋渡辺病院
    /sanno birth ctr/, // 医療法人財団 順和会 山王バースセンター
    /adachi hosp/, // 医療法人財団今井会 足立病院
    /fujikawa hosp, dept internal med, 1-2-6 matsubara, saga, saga 8400831, japan/, // 医療法人 聖医会 藤川病院
    /fukuoka wajiro hosp/, // 福岡和白病院｜社会医療法人財団 池友会
    /karatsu higashi matsuura med assoc ctr/, // 唐津東松浦医師会医療センター
    /minato med clin, dept internal med, chuo ku, 3-11-3 nagahama, fukuoka, fukuoka 8100072, japan/, // 長浜 みなと内科クリニック
    /imamura gen hosp/, // 公益財団法人慈愛会 今村総合病院
    /baseball & sports clin/, // ベースボール＆スポーツクリニック
    /japanese data ctr hematopoiet cell transplantat/, // 一般社団法人 日本造血細胞移植データセンター
    /japan soc transplantat & cellular therapy jstct/, // 一般社団法人日本造血・免疫細胞療法学会
    /kitada resp clin, yao, osaka, japan/, // 北田内科・呼吸器内科
    /fuchu hosp, dept surg, osaka, japan/, // 府中病院 社会医療法人 生長会
    /ageo cent gen hosp/, // 医療法人社団愛友会上尾中央総合病院
    /hayashi clin, dept gastroenterol & internal med, suita, osaka, japan/, // 健都はやしクリニック
    /hokkaido ohno mem hosp/, // 社会医療法人孝仁会 札幌孝仁会記念病院
    /cardiovasc inst,/, // 公益財団法人　心臓血管研究所付属病院
    /cent japan int med ctr/, // 	社会医療法人　厚生会 	中部国際医療センター
    /haradoi hosp, kyushu gen internal med ctr, fukuoka, japan/, // 社会医療法人原土井病院
    /imakiire gen hosp, perinatal med ctr/, // 公益財団法人昭和会いまきいれ総合病院
    /imakiire gen hosp, /,
    /keiju med ctr/, // 董仙会 恵寿総合病院
    /kita fukushima med ctr/, // 北福島医療センター - 仁泉会
    /kohnan med ctr, dept obstet & gynecol, kobe 6580064, japan/, // 公益財団法人 甲南会 甲南医療センター
    /kumamoto ezuko med ctr disabled children/, // 社会福祉法人志友会 くまもと江津湖療育医療センター
    /miyazaki med ctr hosp/, // 医療法人社団 晴緑会 宮崎医療センター病院
    /saitama citizens med ctr/, // 社会医療法人さいたま市民医療センター
    /tmg asaka med ctr/, // 戸田中央医科グループTMGあさか医療センター
    /tokyo kita med ctr/, // 公益社団法人地域医療振興協会東京北医療センター
    /toyota reg med ctr/, // 公益財団法人 豊田地域医療センター
    /yuuai med ctr/, // 医療法人社団 友愛会 友愛病院
    // 徳洲会グループ
    /fukuoka tokushukai hosp/,
    /kishiwada tokushukai hosp/,
    /nanbu tokushukai hosp/,
    /narita tomisato tokushukai hosp/,
    /itami kousei neurosurg hosp/, // 伊丹恒生脳神経外科病院
    /michinoo hosp, med corp kouseikai/, // 医療法人厚生会 道ノ尾病院
    /sendai kousei gen hosp/, // 一般財団法人厚生会 仙台厚生病院
    /aidu chuo hosp, /, // 一般財団法人 温知会 会津中央病院
    /aizu cent hosp/,
    /aihara daini hosp, /, // 医療法人相愛会　相原第二病院
    /aihara hosp, breast ctr/, // 医療法人 啓明会　相原病院
    /aino mem hosp, /, // 医療法人伴帥会 愛野記念病院
    /aizawa hosp, /, // 社会医療法人財団 慈泉会 相澤病院
    /ajisu kyoritsu hosp, /, // 医療法人協愛会 阿知須共立病院
    /akabane cent gen hosp, /, // 医療法人社団博栄会グループ 赤羽中央総合病院
    /akiyama neurosurg hosp, /, // 医療法人社団 仁明会 秋山脳神経外科病院
    /aoi hachioji hosp, /, // 医療法人社団 葵会 AOI八王子病院
    /aoi hachi hosp, /,
    /aoki hosp, tokyo, /, // 医療法人社団 青山会 青木病院
    /aomatsu mem hosp, /, // 青松記念病院
    /asahigawaso minamiehime rehabil hosp, /, // 社会福祉法人旭川荘 旭川荘南愛媛病院・南愛媛療育センター
    /asahiyama hosp, /, // 医療法人 北仁会 旭山病院
    /asai hosp, chiba, japan/, // 医療法人静和会 浅井病院
    /asakayama gen hosp, /, // 公益財団法人 浅香山病院
    /asanogawa gen hosp, /, // 医療法人社団浅ノ川 浅ノ川総合病院
    /authorized nonprofit org, yokohama childrens hosp project, yokohama, japan/, // 認定NPO法人横浜こどもホスピスプロジェクト
    /azuma neurosurg hosp, /, // 社会医療法人 秀公会 あづま脳神経外科病院
    /bell land gen hosp, /, // ベルランド総合病院 - 社会医療法人 生長会
    /bifukai hamadera hosp, /, // 医療法人 微風会 浜寺病院
    /bobath mem hosp, /, // 社会医療法人大道会 ボバース記念病院
    /chikamori hosp, /, // 社会医療法人近森会 近森病院
    /chiyoda hosp, dept orthped surg, miyazaki, japan/, // 社会医療法人 泉和会 千代田病院
    /daido hosp, dept endocrinol & diabet, nagoya, aichi 4578511, japan/, // 社会医療法人宏潤会 大同病院・だいどうクリニック
    /daido hosp, dept hematol, nagoya, aichi, japan/,
    /eiju gen hosp, /, // 公益財団法人ライフ・エクステンション研究所 付属永寿総合病院
    /fratern mem hosp, /, // 社会福祉法人 同愛記念病院
    /fuji hosp, fuji, fukushima 9600811, japan/, // 医療法人 篤仁会 富士病院
    /fujioka hosp, dept gastroenterol, saga, japan/, // 医療法人大和正信会 ふじおか病院
    /fukui gen hosp, /, // 一般財団法人 新田塚医療福祉センター 福井総合病院
    /fukujuji hosp, /, // 公益財団法人結核予防会 複十字病院
    /fukuoka cent hosp, /, // 医療法人社団 高邦会福岡中央病院
    /fukushimura hosp, /, // 医療法人さわらび会 福祉村病院
    /fukuyama cardiovasc hosp, /, // 福山循環器病院. 特定医療法人 財団竹政会
    /fureai yokohama hosp, /, // 医療法人 回生会 ふれあい横浜ホスピタル
    /gakkentoshi hosp, /, // 医療法人社団 医聖会 学研都市病院
    /gunma chuo gen hosp, /, // 社会保険群馬中央総合病院
    /gunma hosp, gunma, 3703516, japan/, // 特定医療法人群馬会 群馬病院
    /hakodate cent gen hosp, /, // 社会福祉法人 函館厚生院 函館中央病院
    /hakuaikai med corp, sagara hosp, /, // 社会医療法人博愛会相良病院
    /hakuaikai sagara hosp, /,
    /hakujujikai sasebo chuo hosp, /, // 社会医療法人社団白十字会 佐世保中央病院
    /hanamaki gen hosp, /, // 公益財団法人 総合花巻病院
    /hanwa izumi hosp, /, // 医療法人 聖和錦秀会 阪和いずみ病院
    /hanwa mem hosp, /, // 医療法人錦秀会　阪和記念病院
    /hanwa sumiyoshi gen hosp, /, // 医療法人錦秀会阪和住吉総合病院
    /hanwasumiyoshi gen hosp, /,
    /hanyu gen hosp, /, // 羽生総合病院 - 医療法人 徳洲会
    /hara sanshin hosp, /, // 医療法人 原三信病院
    /haradoi hosp, /, // 社会医療法人原土井病院
    /hashimoto hosp, dept surg, kanzaki, japan/, // 医療法人啓仁会 橋本病院
    /hayashi eye hosp, fukuoka, japan/, // 医療法人社団研英会 林眼科病院
    /hayashi eye hosp, hakata ku, 4-23-35 hakataekimae, fukuoka 8120011, japan/,
    /heartlife hosp, /, // ハートライフ病院 沖縄県｜社会医療法人かりゆし会
    /hidaka hosp, /, // 医療法人社団日高会日高病院
    /higashi saitama gen hosp, dept cardiol, satte, saitama, japan/, // 社会医療法人ジャパンメディカルアライアンス東埼玉総合病院
    /higashi takarazuka satoh hosp, /, // 医療法人愛心会 東宝塚さとう病院
    /himeji cent hosp, /, // 医療法人公仁会 姫路中央病院
    /hiramatsu hosp, /, // 医療法人ひらまつ病院
    /hokko mem hosp, /, // 社会医療法人社団　カレスサッポロ　北光記念病院
    /hokuou hosp, /,
    /hokusetsu gen hosp, /, // 社会医療法人仙養会北摂総合病院
    /hokuto hosp, /, // 社会医療法人 北斗 北斗病院
    /hoshi gen hosp, /, // 公益財団法人 星総合病院
    /hosoya hosp, dept resp med, 102 nanokaichi cho, ibara, okayama 7150014, japan/, // 医療法人 ほそや医院
    /moriyama neurol ctr hosp/, // 社会医療法人社団森山医会 森山脳神経センター病院
    /ichinomiyanishi hosp, /, // 一宮西病院 | 社会医療法人 杏嶺会
    /ijinkai takeda gen hosp, /, // 医仁会 武田総合病院
    /ijinkai takeda hosp, /,
    /ikeda hosp, dept hematol, kanoya, japan/, // 医療法人青仁会 池田病院
    /imamura hosp, dept gastroenterol, tosu, japan/, // 今村病院 医療法人社団 如水会
    /ims fujimi gen hosp/, // 医療法人社団明理会 イムス富士見総合病院
    /ims sapporo digest dis ctr gen hosp/, // イムス札幌消化器中央総合病院
    /kasukabe chuo gen hosp, /, // IMSグループ医療法人財団明理会春日部中央総合病院
    /inutsuka hosp, dept internal med, kashima, japan/, //　医療法人犬塚病院
    /iseikai hosp, /, // 医療法人医誠会　医誠会病院
    /ishikiri seiki hosp, /, // 医療法人藤井会 石切生喜病院
    /ishikiriseiki hosp, /,
    /iwamuro rehabil hosp, /, // 一般社団法人 新潟県労働衛生医学協会附属岩室リハビリテーション病院
    /jyoban hosp tokiwa fdn, /, // 常磐病院 - ときわ会グループ
    /jyuzen gen hosp, /, // 財団法人積善会十全総合病院
    /kachi mem hosp, /, // 医療法人義興会　可知記念病院
    /kaetsu hosp, /, // 下越病院 | 民医連 社会医療法人新潟勤労者医療協会
    /kagoshima principal hosp, dept digest surg, kagoshima, japan/, // 社会医療法人天陽会 中央病院
    /kameda gen hosp, /, // 医療法人鉄蕉会 亀田総合病院
    /kamiiida daiichi gen hosp, /, // 社会医療法人愛生会総合上飯田第一病院
    /kano hosp, div nephrol, med corp houshikai, fukuoka, japan/, // 医療法人豊資会加野病院
    /med corp houshikai kano hosp, /,
    /kansai rehabil hosp, /, // 医療法人篤友会関西リハビリテーション病院
    /kasuya minami hosp, /, // 医療法人みなみ 粕屋南病院
    /kawaguchi cardiovasc & resp hosp, /, // 医療法人社団康幸会かわぐち心臓呼吸器病院
    /kawamura med soc hosp, dept neurosug, gifu, japan/, // カワムラヤスオメディカルソサエティ河村病院
    /kawasaki hosp, dept internal med, kaizuka, japan/, // 社会医療法人　慈薫会 河崎病院
    /kawasaki rinko gen hosp, /, // 和光会 グループ総合川崎臨港病院
    /kawasaki saiwai hosp, /, //社会医療法人財団 石心会 川崎幸病院
    /keitendo koga hosp, /, // 医療法人敬天堂 古賀病院
    /keiwakai ebetsu hosp, /, // 【医療法人渓和会】江別病院
    /keiyu hosp, /, // 一般財団法人神奈川県警友会けいゆう病院
    /keiyu orthoped hosp, /, // 慶友会慶友整形外科病院
    /keiyukai daini hosp, /, // 社会医療法人恵佑会第2病院
    /kibounoie hosp, kitakanto allergy res inst, /, // 社会福祉法人 希望の家 北関東アレルギー研究所
    /kijima hosp, dept orthoped surg, kanazawa, ishikawa, japan/, // 医療法人社団光仁会木島病院
    /kikuna mem hosp, /, // 医療法人五星会 菊名記念病院
    /kinikyo chuo hosp, /, // 公益社団法人北海道勤労者医療協会 勤医協中央病院
    /kinoko espoir hosp, /, // きのこエスポアール病院 - きのこグループ
    /kinshukai hanwa second hosp, /, // 錦秀会　阪和第二泉北病院
    /kinshukai hanwa, hosp 2, /,
    /kirigaoka tsuda hosp, /, // 医療法人社団恵友会霧ヶ丘つだ病院
    /kitakyushu gen hosp, /, // 社会医療法人 北九州病院 北九州総合病院
    /kitakyushu yahata higashi hosp, /, // 社会医療法人 北九州病院 北九州八幡東病院
    /kobe kaisei hosp, /, // 医療法人財団 神戸海星病院
    /kodama hosp, dept orthopaed surg, 1-3-2 gotenyama, takarazuka 6650841, japan/, // それいゆ会 こだま病院
    /koga hosp 21, /, // 社会医療法人天神会　古賀病院21
    /kokura mem hosp, /, // 一般財団法人平成紫川会小倉記念病院
    /kokura memoria hosp, /,
    /komagino hosp, /, // 医療法人財団 青渓会駒木野病院
    /komatsu sophia hosp, /, // 医療法人社団 愛康会 小松ソフィア病院
    /konan hosp, dept palliat care, kobe, japan/, // 公益財団法人 甲南会 甲南医療センター（旧）甲南病院
    /konan hosp, orthopaed surg, shimotsuma, japan/, // 医療法人社団白峰会 湖南病院
    /koseikai takeda hosp, /, // 医療法人財団 康生会 武田病院
    /koto mem hosp, /, // 医療社団法人 昴会 湖東記念病院
    /kouhoukai takagi hosp, /, // 医療法人社団高邦会高木病院
    /kumagaya gen hosp, /, // 社会医療法人 熊谷総合病院
    /kumamoto takumadai rehabil hosp, /, // 医療法人堀尾会 熊本託麻台リハビリテーション病院
    /kurashiki ctr hosp, /, // 公益財団法人　大原記念倉敷中央医療機構　倉敷中央病院
    /kurashiki sweet hosp, /, // 倉敷スイートホスピタル
    /kure nakadori hosp, /, // 医療法人社団 中川会 呉中通病院
    /kurosawa hosp, dept neurosurg, gunma 3701203, japan/, // 医療法人社団美心会 黒沢病院
    /kusunoki hosp, /, // 医療法人社団　三思会　くすの木病院
    /kyoritsu hosp, dept nephrol & dialysis, kawanishi, japan/, // 医療法人　協和会
    /kyoritsu hosp, dept nephrol & dialysis, nagoya, aichi, japan/, // 医療法人偕行会 名古屋共立病院
    /kyoto konoe rehabil hosp, /, // 医療法人社団 行陵会 京都近衛リハビリテーション病院
    /kyoto min iren asukai hosp, /, // 公益社団法人信和会京都民医連あすかい病院
    /kyoto min iren chuo hosp, /, // 京都民医連中央病院
    /matsuda hosp, dept surg, kurashiki, japan/, // 医療法人天和会 松田病院
    /matsuda orthoped mem hosp, /, // 社会医療法人 松田整形外科記念病院
    /matsuyama shimin hosp, /, // 一般財団法人永頼会 松山市民病院
    /matsuyamashimin hosp, /,
    /minami hanno hosp, /, // 医療法人くすのき会 南飯能病院
    /minato hosp, north tohoku epilepsy ctr, /, // 医療法人清照会湊病院北東北てんかんセンター
    /misato kenwa hosp, /, // みさと健和病院 - 医療法人財団 健和会
    /mishima hosp, dept psychiat, nagaoka, niigata, japan/, // 特定医療法人楽山会　三島病院
    /miyaji hosp, div internal med, kobe, hyogo, japan/, // 医療法人明倫会 宮地病院
    /miyamoto orthopaed hosp, /, // 医療法人社団恵風会 宮本整形外科病院
    /miyamoto orthoped hosp, /,
    /miyazaki zenjinkai hosp, /, // 社会医療法人 善仁会宮崎善仁会病院
    /mizuno mem hosp, /, // 昭愛会 水野記念病院
    /mizushima cent hosp, /, // 社会医療法人 水和会 水島中央病院
    /moriguchi keijinkai hosp, /, // 社会医療法人彩樹守口敬仁会病院
    /morinomiya hosp, /, // 社会医療法人大道会 森之宮病院
    /moriyama hosp, dept neurosurg, asahikawa, hokkaido 0788392, japan/, // 森山病院 社会医療法人元生会
    /muribushi okinawa ctr teaching hosp, /, // 一般社団法人 群星沖縄臨床研修センター
    /musashigaoka hosp, kumamoto, /, // 医療法人田中会 武蔵ヶ丘病院
    /muta hosp, dept gastroenterol, fukuoka 8140163, japan/, // 牟田病院｜医療法人社団 誠和会
    /nagasaki rehabil hosp, /, // 社団法人是真会長崎リハビリテーション病院
    /nagoya ekisaikai hosp, /, // 公益社団法人日本海員掖済会名古屋掖済会病院
    /nakamura mem hosp, /, // 社会医療法人医仁会 中村記念病院
    /nanpuh hosp, /, // 公益社団法人鹿児島共済会 南風病院
    /nerima gen hosp, /, // 公益財団法人東京都医療保健協会／練馬総合病院
    /nerima hikarigaoka hosp, /, // 公益社団法人地域医療振興協会練馬光が丘病院
    /shonan keiiku hosp, /, // 医療法人社団健育会 湘南慶育病院
    /neurosurg east yokohama hosp, /, // 医療法人社団のう救会 脳神経外科東横浜病院
    /niigata cent hosp, /, // 社会医療法人仁愛会新潟中央病院
    /niigata minami hosp, /, // 医療法人 恒仁会 新潟南病院
    /niigata rehabil hosp, /, // 医療法人 愛広会 新潟リハビリテーション病院
    /niigata seiro hosp, /, // 医療法人社団　葵会 新潟聖籠病院
    /nishi isahaya hosp, /, // 医療法人祥仁会西諫早病院
    /nishiarai heart ctr hosp, /, // 西新井ハートセントラルクリニック
    /nishinomiya kyoritsu hosp, /, // 社会医療法人 甲友会 西宮協立脳神経外科病院
    /nojima hosp, dept surg, kurayoshi, japan/, // 医療法人十字会 野島病院｜鳥取県倉吉市
    /nozaki tokushukai hosp, /, // 野崎徳洲会病院
    /obihiro kyokai hosp, /, // 帯広協会病院-北海道社会事業協会帯広病院
    /ochiai gen hosp, dept diabet, maniwa, japan/, // 落合病院｜医療法人社団井口会
    /oda hosp, dept cardiol, kashima, /, // 社会医療法人祐愛会 織田病院
    /oda hosp, dept gastroenterol, kashima, /,
    /ofuna chuo hosp, /, // 社会医療法人財団互恵会大船中央病院
    /ogaki tokushukai hosp, /, // 大垣徳洲会病院
    /ohara gen hosp, /, // 一般財団法人大原記念財団 大原綜合病院
    /ojiya sakura hosp, /, // 社会福祉法人長岡福祉協会小千谷さくら病院
    /okayama cent hosp, okayama 7000017, japan/, // 社会医療法人 　鴻仁会岡山中央病院
    /okayama kyokuto hosp, /, // 公益財団法人操風会岡山旭東病院
    /okayama kyoritsu hosp, /, // 岡山医療生活協同組合総合病院岡山協立病院
    /okehazama hosp brain res inst, /, // 医療法人静心会 桶狭間病院
    /okinawa kyodo hosp, /, // 沖縄医療生活協同組合 沖縄協同病院
    /osaka gyoumeikan hosp, /, // 社会福祉法人大阪暁明館大阪暁明館病院
    /otakanomori hosp, /, // 医療法人社団誠高会 おおたかの森病院
    /otaru ekisaikai gen hosp, /, // 公益社団法人日本海員掖済会小樽掖済会病院
    /otaru ekisaikai hosp,/,
    /otaru kyokai hosp, /, // 北海道社会事業協会小樽病院
    /ozaki eye hosp, hyuga, miyazaki, japan/, // 尾崎眼科 日向本院
    /rakuwa kai otowa hosp, /, // 洛和会
    /rakuwakai marutamachi hosp, /,
    /rakuwakai otowa hosp, /,
    /sada hosp, dept orthopaed surg, fukuoka, japan/, // 医療法人佐田厚生会 佐田病院
    /saga handicapped childrens hosp, /, // 社会福祉法人 佐賀整肢学園こども発達医療センター
    /sagami seikyou hosp, /, // 神奈川県北央医療生活協同組合さがみ生協病院
    /sagara hosp, /, // 社会医療法人博愛会相良病院
    /saiki hosp, dept neurol, ichinoseki, iwate, japan/, // 社団医療法人西城病院
    /saiseikai kumamoto hosp /, // 済生会熊本病院
    /saitama cooperat hosp, /, // 医療生協さいたま生活協同組合 埼玉協同病院
    /saitama sekishinkai hosp, /, // 社会医療法人財団石心会 埼玉石心会病院
    /saka gen hosp, dept resp med, shiogama, japan/, // 公益財団法人 宮城厚生協会 坂総合病院
    /sakuragaoka mem hosp, /, // 社会福祉法人 桜ヶ丘社会事業協会 桜ヶ丘記念病院
    /sannocho hosp, /, // 社会医療法人 嵐陽会 三之町病院
    /sano hosp, dept gastrointestinal canc ctr, kobe, hyogo, japan/, // 医療法人 薫風会 佐野病院
    /sano hosp, gastrointestinal canc ctr, kobe, /,
    /sano hosp, gastrointestinal ctr, kobe, /,
    /sano hosp, gen canc ctr, kobe, japan/,
    /sano hosp, inst minimally invas endoscop care, kobe, hyogo, japan/,
    /sano hosp, kobe, hyogo, japan/,
    /santamaria hosp, /, // 医療法人 和倉会 サンタマリア病院
    /sapporo higashi tokusyukai hosp, /, // 札幌東徳洲会病院
    /sapporo kinentou hosp, /, // 医療法人 記念塔病院
    /sapporo matern womens hosp, /, // 医療法人明日葉会 札幌マタニティ・ウイメンズホスピタル
    /sapporo minami sanjo hosp, /, // 社会医療法人北海道恵愛会 札幌南三条病院
    /sapporo shiroish mem hosp, /, // 社会医療法人医翔会 札幌白石記念病院
    /sapporo shiroishi mem hosp, /,
    /sapporo tokushukai hosp, /, // 札幌徳洲会病院
    /sasebo chuo hosp, /, // 社会医療法人社団白十字会 佐世保中央病院
    /seibo hosp, /, // 社会福祉法人聖母会聖母病院
    /seibo int catholic hosp, /,
    /seijinkai hosp, osaka, japan/, // 成仁会病院
    /seirei mikahahara gen hosp, /, // 社会福祉法人聖隷福祉事業団総合病院聖隷三方原病院
    /seirei mikatahara hosp, /,
    /seirei sakura citizen hosp, /, // 社会福祉法人聖隷福祉事業団聖隷佐倉市民病院
    /seirei yokohama hosp, /, // 社会福祉法人聖隷福祉事業団聖隷横浜病院
    /seisho hosp, /, // 医療法人財団報徳会 西湘病院
    /seishou hosp, /,
    /seizankai kiyokawa hosp, /, // 医療法人社団 静山会 清川病院
    /sendai tokushukai hosp, /, // 仙台徳洲会病院
    /senju hosp, dept resp med, nagasaki, japan/, // 特定医療法人 雄博会 千住病院
    /senri chuo hosp, /, // 協和会 千里中央病院
    /shigei med res hosp, /, // 医療法人創和会 重井医学研究所附属病院
    /shimabara hosp, dept cardiol, kyoto, japan/, // 医療法人令寿会　しまばら病院
    /shimizu hosp, dept neurosurg, kyoto, japan/, // 医療法人清仁会 シミズ病院
    /shin koga hosp, /, // 社会医療法人天神会新古賀病院
    /shinko hosp, dept cardiol, kobe, hyogo, japan/, // 社会医療法人神鋼記念会 神鋼記念病院
    /shinmatusdo cent gen hosp/, // 医療法人財団　明理会　新松戸中央総合病院
    /shinozuka hosp, dept neurol, fujioka, japan/, // 医療法人育生会篠塚病院
    /shinsapporo neurosurg hosp, /, // 医療法人脳神経研究センター 新さっぽろ脳神経外科病院
    /shinyurigaoka gen hosp, /, // 医療法人社団三成会新百合ヶ丘総合病院
    /shioda mem hosp, /, // 医療法人SHIODA 塩田記念病院
    /shiroishikyoritsu hosp, dept gastroenterol, shiroishi, japan/, // 特定医療法人静便堂 白石共立病院
    /shiroyama hosp, cardiovasc ctr, habikino, japan/, // 医療法人春秋会 城山病院
    /shiroyama hosp, otaru, hokkaido, japan/,
    /shonan fujisawa tokushukai hosp, /, // 湘南藤沢徳洲会病院
    /shunan mem hosp, /, // 社会医療法人同仁会 周南記念病院
    /shunkaikai inoue hosp, /, // 社会医療法人 春回会井上病院
    /shuuwa gen hosp, /, // 医療法人 秀和会 秀和総合病院
    /social insurance nakabaru hosp, /, // 社会保険仲原病院
    /social insurance tagawa hosp, /, // 社会保険田川病院
    /social med corp hakuaikai sagara hosp, /, // 社会医療法人博愛会相良病院
    /miyukikai hosp, /, // 社会医療法人みゆき会みゆき会病院
    /sonoda daiichi hosp, /, // 医療法人社団苑田会苑田第一病院
    /southern tohoku gen hosp, /, // 一般財団法人脳神経疾患研究所 附属 総合南東北病院
    /st hill hosp, dept gastroenterol, ube, japan/, // 医療法人 聖比留会 セントヒル病院
    /sugimura hosp, dept neurol, kumamoto, japan/, // 医療法人 杉村会 杉村病院
    /suita tokushukai hosp, /, // 吹田徳洲会病院
    /takahashi cent hosp, dept orthopaed surg, 53 minami cho, takahashi 7160033, japan/, // 医療法人清梁会 高梁中央病院
    /takano hosp, coloproctol ctr, kumamoto, japan/, // 社会医療法人社団 高野会　大腸肛門病センター高野病院
    /takaoka hosp, dept psychiat, himeji, hyogo, japan/, // 高岡病院｜社会医療法人 恵風会
    /takashima hosp, dept pediat, shiroishi, japan/, // 祐愛会 高島病院
    /takatsuki gen hosp, /, // 高槻病院 - 社会医療法人愛仁会
    /takeda gen hosp, dept pathol, kyoto, japan/, // 医仁会武田総合病院
    /takeda gen hosp, dept surg, kyoto, japan/,
    /takeda gen hosp, dept rehabil, fukushima 3-27 yamaga machi, aizu wakamatsu, fukushima 9658585, japan/, // 一般財団法人竹田健康財団竹田綜合病院
    /tane gen hosp, /, // きつこう会多根総合病院
    /tanimura hosp, 10-2 kitakoji, nobeoka 8820041, japan/, // 医療法人康仁会 谷村病院
    /tenri hosp, /, // 公益財団法人　天理よろづ相談所・憩の家天理よろづ相談所病院
    /tenri yorozu hosp, /,
    /tenshi hosp, /, // 社会医療法人母恋 天使病院
    /tenshindo hetsugi hosp, /, // 社会医療法人財団 天心堂 へつぎ病院
    /tenwakai matsuda hosp, /, // 医療法人天和会 松田病院
    /tobata kyoritsu hosp, /, // 社会医療法人共愛会 戸畑共立病院
    /tobu sougou hosp, chigasaki, kanagawa, japan/, // 医療法人社団康心会 湘南東部総合病院
    /toda chuo gen hosp, /, // 医療法人社団東光会戸田中央総合病院
    /toho hosp, dept internal med, midori, japan/, // 医療法人社団三思会 東邦病院
    /tokiwa hosp, tokiwa child dev ctr, sapporo, japan/, // 特定医療法人さっぽろ悠心の郷 ときわ病院 こども発達センター
    /tokiwakai hosp, dept internal med, fujisakimachi, aomori 0381216, japan/, // 医療法人 ときわ会ときわ会病院
    /tokyo adventist hosp, /, // 医療法人財団アドベンチスト会東京衛生アドベンチスト病院
    /tokyo bay rehabil hosp, /, // 医療法人社団保健会　東京湾岸リハビリテーション病院
    /tokyo heart rhythm hosp, /, // 東京ハートリズムクリニック
    /tokyo rinkai hosp, /, // 日本私立学校振興・共済事業団東京臨海病院
    /tokyo shinagawa hosp, /, // 医療法人社団東京巨樹の会東京品川病院
    /tolvo shinagawa hosp, dept resp med, shinagawa ku, 6-3-22 higashioi, tokyo 1408522, japan/,
    /toshiba hosp, /, // 医療法人社団東京巨樹の会東京品川病院(旧東芝病院)
    /tokyo tenshi hosp, /, // 医療法人社団玉栄会東京天使病院
    /tokyo west tokushukai hosp, /, // 東京西徳洲会病院
    /tomakomai nissho hosp, /, // 医療法人社団 養生館｜苫小牧日翔病院
    /tomishiro cent hosp, dept radiol, tomigusuku, japan/, // 社会医療法人友愛会 豊見城中央病院
    /tone chuo hosp, /, // 利根中央病院｜利根保健生活協同組合
    /tottori seikyo hosp, /, // 鳥取医療生活協同組合 鳥取生協病院
    /tsuchiya childrens hosp, /, // 医療法人土屋小児病院
    /tsuchiya gen hosp, /, // 特定医療法人あかね会土谷総合病院
    /tsukuba kinen gen hosp, /, // 医療法人社団筑波記念会 筑波記念病院
    /tsunoda hosp, dept rehabil, gunma 675-4 kamishinden,tamamura machi, sawagun 3701133, japan/, // 医療法人　樹心会　角田病院
    /tsuyama cent hosp, /, // 一般財団法人津山慈風会津山中央病院
    /tsuyama chuo hosp, /,
    /ueda hosp, dept pediat, 1-1-4 kunikadori,chuo ku, kobe 6510066, japan/, // 医療法人社団　直太会　母と子の上田病院
    /ueno hosp, dept surg & digest dis, fukuoka, japan/, // 医療法人うえの病院
    /uji tokushukai hosp, /, // 宇治徳洲会病院
    /uki gen hosp, /, // 社会医療法人 黎明会 宇城総合病院
    /uonuma kikan hosp, /, // 一般財団法人 新潟県地域医療推進機構新潟大学地域医療教育センター 魚沼基幹病院
    /ushiku aiwa gen hosp, /, // 医療法人社団常仁会牛久愛和総合病院
    /utazu hosp, kagawa, japan/, // 医療法人社団清仁会　宇多津病院
    /wajokai eniwa hosp, /, // 医療法人社団我汝会えにわ病院
    /washoukai sadamoto hosp, /, // 医療法人和昌会 貞本病院
    /watanabe hosp, matsuyama, japan/, // 医療法人ミネルワ会渡辺病院
    /yamamoto mem hosp, dept surg, imari, japan/, // 山元記念病院（社会医療法人謙仁会）
    /yodogawa christians hosp, /, // 宗教法人在日本南プレスビテリアンミッション淀川キリスト教病院
    /yoichi hosp, dept phys med, 19-1-1 kurokawa cho yoichi, yoichi, hokkaido 0460003, japan/, // 社会福祉法人 北海道社会事業協会 余市病院
    /yokohama asahi chuo gen hosp, yokohama, kanagawa, japan/, // 医療法人社団 明芳会 横浜旭中央総合病院
    /yokohama ekisaikai hosp, /, // 公益社団法人日本海員掖済会横浜掖済会病院
    /yokohama gen hosp, /, // 医療法人社団 緑成会 横浜総合病院
    /yokohama shinmidori gen hosp, /, // 医療法人社団 三喜会 横浜新緑総合病院
    /yokohama shintoshi neurosurg hosp, /, // 医療法人社団 明芳会 横浜新都市脳神経外科病院
    /yokokura hosp, /, // 社会医療法人 弘恵会 ヨコクラ病院
    /yonaha okanoue hosp, /, // 医療法人尚徳会 ヨナハ丘の上病院
    /yoshida gen hosp, dept surg, hiroshima, japan/,
    /yoshino hosp, dept psychiat, machida, tokyo, japan/, // 医療法人社団　正心会　よしの病院
    /yuai kai fdn & oda hosp, dept gen med, saga, japan/, // 社会医療法人祐愛会 織田病院
    /yuai mem hosp, dept cardiol, koga, japan/, // 茨城県民生活協同組合友愛記念病院
    /adachi breast clin, dept breast surg, kyoto, japan/, // 医療法人財団今井会足立病院「足立乳腺クリニック」
    /ageo mental clin, saitama, 3620037, japan/, // 上尾メンタルクリニック
    /aichi hlth promot fdn, /, // 一般財団法人 愛知健康増進財団
    /aiiku clin, dept psychiat & behav sci, tokyo, japan/, // 恩賜財団母子愛育会愛育クリニック
    /akasaka endoscop clin, tokyo, japan/, // 赤坂内視鏡クリニック
    /akasaka miura clin, tokyo, japan/, // 赤坂三浦クリニック
    /akebono clin, okayama 7028056, japan/, // 医療法人栄生会　あけぼのクリニック
    /allergy support network, nagoya, aichi, japan/, // 認定NPO法人アレルギー支援ネットワーク
    /amagase clin, kitakyushu, fukuoka, japan/, // 天ヶ瀬クリニック
    /amed crest japan agcy med res & dev, /,
    /aoi home healthcare clin, okayama, japan/, // 訪問介護サービスあおい
    /apari clin, tokyo, japan/, // 医療法人社団アパリ アパリクリニック
    /arche clin, saitama, saitama, japan/, // アルシェクリニック
    /asami naika clin, /, // 医療法人社団由和会 あさみ内科クリニック
    /asia ctr air pollut res, /, // 一般財団法人 日本環境衛生センター. アジア大気汚染研究センター
    /asia ctr atmospher pollut res, /,
    /awase daiichi clin, okinawa, japan/, // 医療法人 さくら会 アワセ第一医院
    /canc policy summit, nonprofit org, tokyo 1550032, japan/, // 特定非営利活動法人がん政策サミット
    /canc support kagoshima, specified nonprofit org, kagoshima 8908511, japan/, // がん患者さんとご家族の患者会 NPO法人 がんサポートかごしま
    /cardio vasc inst, /, // 公益財団法人 心臓血管研究所付属病院
    /cardiovasc res inst, /,
    /cent inst expt anim, /, // 公益財団法人実験動物中央研究所
    /cent japan cord blood bank, /, // 一般社団法人中部さい帯血バンク
    /clin minami ichijyo neurol, sapporo, hokkaido 0600061, japan/, // 南一条脳内科
    /clin res support ctr kyushu, fukuoka, japan/, // 一般社団法人九州臨床研究支援センター
    /clin res support ctr kyushu, stat & data ctr, fukuoka 8128582, japan/,
    /comfort hotel sendai higashiguchi, epilepsy clin bethel satellite sendai stn, 1f,205-5 nakakecho, sendai, miyagi 9830864, japan/, // てんかんクリニック （EPILEPSY CLINIC）仙台駅前ベーテル
    /dept cardiol, akabane clin, outawara, tochigi, japan/, // 赤羽医院 - Akabane Clinic | 大田原市
    /dept epileptol, yokohama minoru epilepsy & dev clin, 2-6-16,367 shin yokohama,kohoku-ku, yokohama, kanagawa 2220033, japan/, // 医療法人社団 新東会 横浜みのるクリニック
    /hanna sawarabi ryoikuen, /, // 社会福祉法人榛桐会はんな・さわらび療育園
    /dept welf elderly, niigata 3-3-3 chuo cho, shibata, shibata 9578686, japan/, // 新発田市役所本庁舎
    /dobashi naika clin, sendai, japan/, // 医療法人土橋内科医院
    /east nagoya imaging diag ctr, nagoya, japan/, // 医療法人 名古屋放射線診断財団東名古屋画像診断クリニック
    /ehime canc support assoc orange, specified nonprofit org, matsuyama, ehime 7900023, japan/, // NPO法人愛媛がんサポート おれんじの会
    /engage ndb task force, tokyo, japan/, // 免疫アレルギー疾患研究10か年戦略次世代タスクフォース
    /fdn biomed res & innovat kobe, /, // 公益財団法人神戸医療産業都市推進機構医療イノベーション推進センター
    /fdn biomed res & innovat, /,
    /fujioka pediat clin, osaka, japan/, // 医療法人 ふじおか小児科
    /ando breast clin, nagoya, japan/, // あんどう乳腺クリニック
    /yao tokushukai gen hosp, /, // 八尾徳洲会総合病院
    /fukuwa clin, tokyo, japan/, // 医療法人社団福和会 福和クリニック
    /fureai machida hosp, /, // 医療法人社団康心会 ふれあい町田ホスピタル
    /furukawa ent clin, 5-1 oharacho, ashiya, hyogo 6590092, japan/, // 古川耳鼻咽喉科医院
    /gifu heart ctr, /, // 医療法人 澄心会岐阜ハートセンター
    /gunma seishi ryougoen, /, // 社会福祉法人二之沢愛育会群馬整肢療護園
    /hakuhou clin, dept psychiat, saitama, saitama, japan/, // 医療法人 秀山会　白峰クリニック
    /hanatsuka clin, sakura, tochigi, japan/, // 花塚クリニック
    /hatori clin, kawasaki, japan/, // はとりクリニック
    /headquarters med corp iseikai, osaka, japan/, // 医療法人医誠会 法人本部
    /okayama heart clin, /, // 岡山ハートクリニック
    /heisei hidaka clin, dept hepatol, gunma, japan/, // 医療法人社団日高会平成日高クリニック
    /hematol ohta clin, osaka, japan/, // LIGARE血液内科太田クリニック
    /hikichi eye clin, sapporo, hokkaido, japan/, // 医療法人泰睛会 ひきち眼科
    /hiramitsu heart clin, nagoya, japan/, // 平光ハートクリニック
    /hirono naika clin, dept internal med, miyazaki, japan/, // 宮崎県宮崎市 肝臓専門 ひろの内科クリニック
    /hiroshima high precis radiotherapy canc ctr, /, // 一般社団法人広島県医師会広島がん高精度放射線治療センター HIPRAC（ハイプラック）
    /hofu inst gastroenterol, /, // 一般財団法人 防府消化器病センター
    /hokkaido renal pathol ctr, sapporo, hokkaido, japan/, // 特定非営利活動法人北海道腎病理センター
    /honma childrens clin, fukuoka, japan/, // 医療法人 本間小児科医院
    /hyakudomi clin, breast surg, izumo, shimane, japan/, // ひゃくどみクリニック
    /ichinomiya med treatment & habilitat ctr, /, // 社会福祉法人杏嶺会 一宮医療療育センター
    /igarashi med clin, shimonoseki, yamaguchi, japan/, // 五十嵐内科
    /ims katsushika heart ctr, dept cardiol, tokyo, japan/, // イムス葛飾ハートセンター - IMSグループ
    /infect control comm, japanese soc dialysis therapy, 2-38-21 hongo, bunkyo ku, tokyo, japan/, // 日本透析医学会
    /infus & prevent clin, dept internal med, fukuoka, japan/, // 医療法人社団予防会福岡クリニック
    /ishida clin ibd & gastroenterol, dept ibd & gastroenterol, oita, japan/, // 石田消化器IBDクリニック
    /ito med clin, dermatol, kitsuki, japan/, // 伊藤皮膚科
    /iwakura community gen support ctr, sakyo ku, kyoto 1255 iwakuranagatani cho, kyoto 6060026, japan/, // 医療法人三幸会京都市岩倉地域包括支援センター
    /iwamoto internal med clin, kitakyushu 8020832, japan/, // 医療法人 岩本内科医院
    /japan anti tb assoc, /, // 公益財団法人結核予防会
    /japan baptist med fdn, /, // 日本バプテスト病院
    /japan bioassay res ctr, /, // 日本バイオアッセイ研究センター
    /japan broncho esophagol soc, tokyo, japan/, // 日本気管食道学会
    /japan depress ctr, tokyo, japan/, // 一般社団法人日本うつ病センター
    /japan esophageal soc, /, // 日本食道学会
    /japan lung canc alliance, /, // 日本肺がん患者連絡会
    /japan med assoc, hiroshima, japan/, // 一般社団法人 広島市医師会
    /japan pediat soc, comm immunizat & infect dis, tokyo, japan/, // 公益社団法人 日本小児科学会
    /japan specif hlth checkups j shc study grp, fukushima, japan/, // The Japan Specific Health Checkups (J-SHC) study
    /japanese assoc res thymus jart, osaka, japan/, // 特定非営利活動法人 日本胸腺研究会
    /japanese data ctr haematopoiet cell transplantat, nagakute, japan/, // 一般社団法人日本造血細胞移植データセンター
    /japanese fdn multidisciplinary treatment canc, tokyo, japan/, // 公益財団法人 がん集学的治療研究財団
    /japanese gynecol oncol grp, shinjuku ku, tokyo 1620825, japan/, // 特定非営利活動法人 婦人科悪性腫瘍研究機構
    /japanese org res & treatment canc jortc data ctr, /, // NPO法人JORTC
    /japanese org res & treatment canc jortc, /,
    /japanese soc anesthesiol perioperat smoking cesat, /, // 日本⿇酔科学会周術期禁煙ガイドライン
    /yokohama minoru epilepsy & dev clin/, // 医療法人社団 新東会 横浜みのるクリニック
    /uji tokushukai med ctr,/, // 宇治徳洲会病院
    /takagi clin, sendai, miyagi, japan/, // 医療法人社団 明世会 高木医院,
    /nihonbashi med & allergy clin, tokyo, japan/, // 日本橋内科・アレルギー科クリニック
    /tsutsujigaoka childrens clin, chita, aichi, japan/, // 医療法人双優会 つつじが丘こどもクリニック
    /jortc data ctr,/, // NPO法人JORTC
    /sbs shizuoka hlth promot ctr,/, // SBS 静岡健康増進センター
    /seirei healthcare support ctr,/, // 聖隷福祉事業団 ; 施設名, 聖隷健康サポートセンターShizuoka
    /minato med clin, dept internal med, 3-11-3 nagahama,chuo ku, fukuoka, fukuoka 8100072, japan/, // 長浜 みなと内科クリニック
    /matsumura clin, tokyo, japan/, // 松村医院
    /katsuragawa mizuta ent clin,/, // 医療法人社団悠水会 桂川みずた耳鼻咽喉科
    /niigata diagnost imaging ctr,/, // 新潟画像診断センター（ＮＰＯ法人）
    /sugimoto naika clin, sakai, osaka, japan/, // すぎもと内科クリニック
    /kobe inst hlth, dept infect dis, kobe, hyogo 6500046,/, // 医療イノベーション推進センター (TRI)
    /neurol chiba clin,/, // 脳神経内科　千葉
    /plast surg clin, kumamoto dermatol, kumamoto, japan/, // 医療法人社団藤樹会 熊本皮ふ科・形成外科
    /yakeyama dent off,/, // やけやま歯科医院
    /ohishi clin, yokohama, japan/, // 医療法人社団 祐和会　大石クリニック
    /noma kokoro clin,/, // のまこころクリニック
    /sugiura cln, izumo,/, // 医療法人医純会 すぎうら医院
    /med corp heishinkai tocrom clin/, // 医療法人平心会 ToCROMクリニック
    /segawa mem neurol clin children/, // 医療法人社団 昌仁醫修会 瀬川記念小児神経学クリニック
    /jplsg japan pediat leukemia lymphoma study grp,/,
    /saitama neuropsychiat inst,/, // 社会福祉法人シナプス 埼玉精神神経センター
    /kyoto esophageal & gastr surg study grp,/, //
    /sekishin clin, dept cardiol, kawagoe, saitama,/, // 社会医療法人社団尚篤会 赤心クリニック
    /zengyodanchi ishikawa clin,/, // 善行団地石川医院
    /kanda naika clin, osaka/, // 神田内科クリニック
    /sawaki internal med & diabet clin, osaka/, // 澤木内科・糖尿病クリニック
    /matsuda diabet clin, kobe/, // 糖尿病内科まつだクリニック
    /ohyama dermatol clin, kumamoto, japan/, // 大山皮膚科医院
    /tokushukai grp,/,
    /tsuji clin, kyoto/, // 辻クリニック 京都
    /wakayama breast clin,/, // 和歌山ブレストクリニック
    /toyoda aoba clin, shizuoka/, // とよだ青葉クリニック
    /kameda ivf clin makuhari,/, // 亀田IVFクリニック幕張
    /specified nonprofit corp canc notes, tokyo/, // 特定非営利活動法人がんノート
    /ladies clin cosmos, kochi/, // レディスクリニック コスモス
    /jsfp patient network,/, // 日本がん・生殖医療学会
    /shimazu med clin, tokyo,/, // 医療法人社団仁英会 島津メディカルクリニック
    /yumino heart clin,/, // 医療法人社団ゆみの ゆみのハートクリニック
    /tokushukai east pathol ctr, tsukuba,/, // 徳洲会グループ　病理部会
    /honcho internal med clin, nasushiobara,/,
    /kawano clin, utsunomiya,/, // 医療法人緑水会 川野クリニック
    /ohwada naika, utsunomiya,/, // 医療法人恒友会大和田内科
    /masuyama gi clin, otawara,/, // 医療法人 増山胃腸科クリニック
    /res inst tb, dept epidemiol & clin res,/, // 公益財団法人結核予防会結核研究所
    /yasuma eye clin, nagoya,/, // 安間眼科
    /seto dent clin, kagoshima 8994101,/, // せと歯科医院
    /sapporo endoscop spine surg clin,/, // 札幌脊椎内視鏡・整形外科クリニック
    /jin eye clin, kobe,/,
    /kohinata eye clin, tokyo,/, // こひなた眼科
    /sci res works peer support grp srws psg,/, // Scientific Research WorkS Peer Support Group (SRWS-PSG)
    /systemat review workshop peer support grp srws ps,/, // Systematic Review Work Shop-Peer Support Group (SRWS-PSG)
    /kimura eye clin, iwaki,/, // 木村眼科クリニック
    /matsuo clin, fukuoka,/, // 医療法人輝松会 まつお内科クリニック
    /ueno jinn touseki clin,/, // うえの腎透析クリニック
    /yano clin, fukuoka/, // やのクリニック
    /shimohashi naika clin, fukuoka,/, // しもはし内科クリニック
    /zama childrens clin,/, // 座間小児科
    /junpukai hlth maintenance ctr kurashiki,/, // 一般財団法人淳風会 淳風会健康管理センター倉敷
    /noda family clin,/, // のだ内科ファミリークリニック
    /toda chuo hlth exam ctr,/, // 戸田中央メディカルケアグループ戸田中央 総合健康管理センター
    /kuma home med care clin,/, // くま在宅クリニック
    /natl clin database ncd,/, // 一般社団法人National Clinical Database
    /japanese soc gastroenterol surg,/, // 日本消化器外科学会
    /miwa cent clin, mito,/, // 医療法人明暢会 見和中央クリニック
    /otakanomori childrens clin,/, // おおたかの森こどもクリニック
    /kumagai pediat clin, hokuto,/, // 熊谷内科小児科医院（北斗市/上磯駅）
    /lab lente verde, sodegaura,/,
    /jortc data ctr,/, // NPO法人JORTC
    /shinjuku sleep & resp clin,/, // 新宿 睡眠・呼吸器内科クリニック
    /uji tokushukai med ctr,/, // 宇治徳洲会病院
    /tanemulti solut gen hosp,/,
    /oku med clin, osaka 5730164,/, // おくクリニック
    /machida orthopaed, orthopaed, kochi,/, // 医療法人 博恵会 町田整形外科
    /machida orthopaed, rehabil, kochi,/,
    /nakayamadera imai clin, takarazuka,/, // 中山寺いまいクリニック
    /minoyama otolaryngol med corp,/, // ミノヤマ耳鼻咽喉科
    /sendai cardiovasc ctr,/, // 一般財団法人宮城県成人病予防協会附属 仙台循環器病センター
    /lung oncol grp kyusyu logik,/, // LOGiK-九州肺癌機構
    /meizankai shimizu ganka, matsue,/, // 医療法人茗山会 清水眼科
    /tsutsumi orthopaed clin,/, // 医療法人祥穂会 つつみ整形外科
    /suzuki otolaryngol clin, chuo ku, niigata 6-5-37 meike, niigata 9500941, japan/, // 鈴木耳鼻咽喉科医院
    /kajiwara clin, kitakyushu,/, // かじわらクリニック
    /med corp iseikai,/, // 医療法人医誠会
    /sendai taihaku dermatol clin,/, // 医療法人社団廣仁会 仙台たいはく皮膚科クリニック
    /terada clin, resp med & gen practice, resp med, himeji,/, // 寺田内科・呼吸器科
    /nagoya heart ctr,/, // 名古屋ハートセンター
    /kondo clin rheumatol & orthpaed surg, fukuoka,/, // 医療法人近藤リウマチ・整形外科クリニック
    /ps clin, fukuoka,/, // 医療法人相生会 ピーエスクリニック
    /med co lta ps clin, dept rheumatol, fukuoka,/,
    /kumada kids family clin, omihachiman,/, // くまだキッズ・ファミリークリニック
    /japanese soc helicobacter res,/, // 日本ヘリコバクター学会
    /yumura clin, osaka,/, // 勇村医院
    /nakazato clin, urasoe,/, // なかざとクリニック
    /kitada resp clin, yao,/, // 北田内科・呼吸器内科
    /japanese soc early mobilizat,/, // the Japanese Society for Early Mobilization (JSEM)
    /ohmori toshihide gastrointestinal clin,/, // 大森敏秀胃腸科クリニック
    /matsushima clin, dept gastrointestinal div, yokohama,/, // 医療法人　恵仁会　松島病院
    /kanke gastrointestinal clin,/, // かんけ胃腸クリニック
    /nakayamadera imai clin,/, // 中山寺いまいクリニック
    /miyashita rheumatol clin,/, // みやしたリウマチ・内科クリニック
    /sohara clin, gunma,/, // そはら内科
    /takatsuki hosp,/, // 高槻病院 - 社会医療法人愛仁会
    /med corp foster osaka,/, // 医療法人フォスター
    /lab mol psy chiatry, hiroshima,/, // 広島精療精神医学研究会
    /jgog1079 data ctr,/,
    /shigehira clin, dept internal med, miyazaki,/, // しげひらクリニック
    /kumamoto ashikita ctr severely disabled,/, // 社会福祉法人 志友会 くまもと芦北療育医療センター
    /minamiichijyo neurol clin, sapporo,/, // 社会医療法人 北海道恵愛会 札幌南一条病院
    /sun clin, tome,/, // 医療法人社団 やすらぎの里 サンクリニック
    /tsumura family clin, fukuoka,/, // 医療法人 つむらファミリークリニック
    /nagai pediat clin, fukuoka,/, // 医療法人 長井小児科医院
    /sapporo cough asthma & allergy ctr,/, // NPO法人 札幌せき・ぜんそく・アレルギーセンター (SCAAC)
    /suzuki diadetes clin, atsugi,/, // すずき糖尿病内科クリニック
    /nunoue clin, tsuyama,/, // 医療法人 蘭和会 布上内科医院
    /osafune clin, internal med, setouchi,/, // 医療法人社団仁明会 おさふねクリニック
    /suzugamine imanaka clin,/, // 医療法人社団 鈴峰今中医院
    /nampei orthopaed & rheumatol clin, nara,/, // 医療法人 南平整形外科 南平整形外科リウマチ科
    /nunotani orthopaed clin, 3-8 nishiaimoncho, toyama, toyama 9300068/, // 医療法人社団 谷の風 布谷整形外科医院
    /southern tohoku proton therapy ctr,/, // 一般財団法人 脳神経疾患研究所 附属 南東北がん陽子線治療センター
    /takasu koen mental hlth clin, chiba,/, // 医療法人社団　聖史会　高洲公園心療医院
    /misakaenosono mutsumi dev med & welf ctr,/, // 社会福祉法人聖家族会みさかえの園総合発達医療福祉センターむつみの家
    /yasui ent clin, 1294-1 minaminakayasumatsu, osaka 5980033,/, // やすい耳鼻咽喉科
    /saga himat fdn, ion beam therapy ctr, tosu,/, // 公益財団法人　佐賀国際重粒子線がん治療財団九州 国際重粒子線がん治療センター　（サガハイマット）
    /taihaku ave clin,/, // 大博通り内科・総合診療クリニック
    /real life practice experts hcc relpec study grp j, ogaki,/, // Real‒life Practice Experts for HCC (RELPEC) Study Group (RELPEC)
    /zikei inst psychiat, dept lab med & pathol, okayama,/, // 公益財団法人慈圭会 慈圭病院
    /tokuyukai med corp, inst rehabil sci, 3-11-1 sakuranocho, toyonaka, osaka 5600054,/, // 医療法人篤友会 関西リハビリテーション病院
    /tokuyukai rehabil clin, shinsenrinishimachi 2-24-18, toyonaka, osaka 5600083,/, // 医療法人篤友会 リハビリテーションクリニック
    /tokushima breast care clin,/, // とくしまブレストケアクリニック
    /kono orthopaed clin, dept orthoped surg, tokyo,/, // 医療法人社団豊隆会 河野整形外科
    /learning hlth soc inst,/, // 一般財団法人　LHS研究所
    /med corp heishinkai ocrom clin,/, // 医療法人平心会OCROMクリニック
    /sato clin, okayama 7000864,/, // 医療法人 佐藤医院
    /wakaba hifuka clin, tokyo,/, // わかばひふ科クリニック
    /matsuwaki clin shinagawa,/, // 医療法人社団恵芳会 松脇クリニック品川
    /kyoto nose & allergy clin,/, // 京都駅前耳鼻咽喉科アレルギー科クリニック
    /minamiosawa med plaza, tokyo,/, // 南大沢メディカルプラザ
    /nagase clin dermatol, tokyo,/, // 銀座長瀬クリニック
    /okimoto clin, kure,/, // 医療法人 沖本クリニック
    /toda cent pathol inst, 1-14-1 honcho, toda 3350023,/, // 戸田中央病理診断科クリニック
    /toyota josui mental clin,/, // 豊田浄水こころのクリニック
    /kishokai med corp, nagoya,/, // 医療法人 葵鐘会
    /soyokaze allerg clin, 2-41-12-207 ogikubo,suginami ku,/, // そよ風クリニック
    /kokura monona hosp,/, // PMID:35304345 Department of Neurosurgery, Kokura Memorial Hospital, Fukuoka, Japan. 一般財団法人平成紫川会 小倉記念病院
    /dept child & adolescent psychiat, kurume, japan/, // PMID:35667888 Department of Neuropsychiatry, Graduate School of Medical Sciences, Kyushu University, Fukuoka, Japan; Horikawa Hospital, Kurume, Japan., 医療法人社団 堀川会 堀川病院
    /National Clinical Database, Tokyo,/, // 一般社団法人National Clinical Database
    /nagai pediat clin, miyagino ku, 1-25-10 miyagino, sendai, miyagi 9830045,/, // 永井小児科医院 - 仙台市宮城野区
    /2Shin machi, Hirakata, Osaka 573, Japan/, // PMID:35817249 Kansai Med Univ, Dept Internal Med 1, Div Resp Med Infect Dis & Allergol, Hirakata, Japan
    /dept gastroenterol & hepatol, sapporo, hokkaido, japan/, // PMID:36208496 Department of Gastroenterology and Hepatology, Hokkaido, Japan; University Graduate School of Medicine, Sapporo, Japan.
    /kyoto clin & translat res ctr neurocognit disorde, kyoto, japan/, // PMID:36457867 Kyoto Clinical and Translational Research Center for Neurocognitive Disorders, Kyoto, Japan. 京都大学高次生体イメージング先端テクノハブ
    /japan multinatl trial org, operat off, nagoya, japan/, // PMID:36807519 Japan-Multinational Trial Organization (JMTO) 一般社団法人 日本・多国間臨床試験機構
  ];
  return [
    ...univ,
    ...rosaiHosp,
    ...redCross,
    ...prefecturalHosp,
    ...cityHosp,
    ...redCross,
    ...government,
    ...jcho,
    ...kyosai,
    ...kouseiren,
    ...company,
    ...saiseikai,
    ...hospNames,
  ];
}

module.exports = {
  getNonNHOFacilitiesOrganizations,
  getNonNHOFacilitiesFullAddress,
};
