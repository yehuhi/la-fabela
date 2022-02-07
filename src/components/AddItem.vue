<template>
  <div class="q-pa-md " dir="rtl">
    <p style="text-align: right; font-weight: bold; font-size: 30px; color: #ffce0c">+ פרסום מודעות </p>
    <div class="row" style="padding: 5px 0 5px 20px">
      <q-radio style="left: auto" class="col-6  col-sm-3" size="lg" keep-color v-model="localEditedItem.status"
               val="חדש"
               label="חדש"
               color="orange"/>
      <q-radio class="col-6  col-sm-3" size="lg" keep-color v-model="localEditedItem.status" val="משומש" label="משומש"
               color="orange"/>
    </div>
    <div class="row" style="padding: 0 10px 40px 10px">
      <q-select class="col-12 col-sm-4"
                style="padding: 15px"
                bg-color="orange-3"
                outlined rounded
                standout="bg-transparent"
                v-model="localEditedItem.manufacturer"
                :options="manufacturerOptions"
                behavior="menu"
                label="יצרן"/>
      <!--      <q-select class="col-12 col-sm-4" bg-color="orange-3" outlined-->
      <!--                rounded-->
      <!--                style="padding: 15px"-->
      <!--                standout="bg-transparent"-->
      <!--                v-model="localEditedItem.Vehicle" :options="VehicleOptions" behavior="menu" label="קטגוריה"/>-->
      <q-select class="col-12 col-sm-4" bg-color="orange-3" outlined
                rounded
                style="padding: 15px"
                standout="bg-transparent"
                v-model="localEditedItem.model" :options="modelOptions" behavior="menu" label="דגם"/>
      <q-select class="col-12 col-sm-4" bg-color="orange-2" outlined
                rounded
                style="padding: 15px"
                standout="bg-transparent"
                v-model="localEditedItem.selectYear" :options="YearOptions" behavior="menu" label="שנה"/>
      <q-input class="col-12 col-sm-4" bg-color="orange-2" clearable clear-icon="close" rounded outlined
               style="padding: 15px"
               v-model="localEditedItem.textPart" label="שם החלק"/>
      <q-select class="col-12 col-sm-4" bg-color="orange-2" outlined
                rounded
                style="padding: 15px"
                standout="bg-transparent"
                v-model="localEditedItem.selectYear" :options="YearOptions" behavior="menu" label="שנה"/>
      <!--      <q-input class="col-12 col-sm-4" bg-color="orange-2" prefix="ש''ח" clearable clear-icon="close"-->
      <!--               style="padding: 15px"-->
      <!--               rounded-->
      <!--               outlined v-model="localEditedItem.pricePart" label="מחיר" type="number"/>-->
      <q-input class="col-12 col-sm-4" bg-color="orange-1" clearable clear-icon="close" rounded
               style="padding: 15px"
               outlined
               v-model="localEditedItem.quantityPart" label="כמות" type="number"/>
      <q-input class="col-12 col-sm-4" bg-color="orange-1" clearable clear-icon="close" rounded
               style="padding: 15px"
               prefix="#"
               outlined
               v-model="localEditedItem.numberPart" label="ברקוד"/>
      <q-file class="col-12 col-sm-4"
              bg-color="orange-1s"
              color="grey-3" rounded outlined
              v-model="localEditedItem.image"
              @input="imageSelected"
              accept="image/*"
              label="בחר תמונה"
              style="padding: 15px">
        <template v-slot:append>
          <q-icon name="attachment" color="orange"/>
        </template>
      </q-file>
    </div>
    <div class="row justify-center">
      <q-btn v-if="!this.$route.params.id" rounded type="reset" class=" glossy"
             style="background-color: #ffce0c; font-size: 20px; width: 150px" label="פרסם" @click="insert()"/>
      <q-btn v-if="this.$route.params.id" class="glossy" rounded color="primary" label="Update" @click="update()"/>
      <div class="q-pa-xl-lg q-gutter-xl-md">
        <!--        <q-btn label="Alert" color="primary" @click="alert = true"/>-->
        <q-dialog v-model="alert">
          <q-card style="width: 90%; height: 200px; background-color: #ffce0c; border-radius: 20px">
            <q-card-section>
              <div class="text-h6" style="text-align: right; font-weight: bold">:הודעה</div>
            </q-card-section>

            <q-card-section class="q-pt-none" style="text-align: right">
              הפרסום ממתין לאישור הנהלת האתר לה פבאלה,
              תוך 12 שעות אם אין חומר אסור הפרסום יעלה לאתר
              ,תודה לך
            </q-card-section>

            <q-card-actions align="left">
              <q-btn flat label="OK" color="red" v-close-popup/>
            </q-card-actions>
          </q-card>
        </q-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState, mapMutations} from "vuex";


const manufacturerOptions = ['AUDI', 'Volswagen', 'FERRARI', 'MERCEDES-BENZ', 'B.M.W', 'MASERATI'];
const nameParts = [
  'רכב שלם',
  'רכב לשיקום',
  // <option value="163">רכב שלם / לפירוק</option>
  'בלמים / ברקסים',
  'צלחות בלם אחוריות',
  'צלחות בלם קדמיות',
  'קליפר ימין',
  'קליפר שמאל',
  'רפידות בלם',
  'בלמים / ברקסים - אחר',
  'גלגלים',
  "ג'אנט - ברזל",
  "ג'אנט - מגנזיום",
  'טסות',
  'צמיגים',
  'גלגלים - אחר',
  'חיישנים',
  'חיישן אוויר',
  'חיישן אורות',
  'חיישן גיר',
  'חיישן הצתה',
  'חיישן חום מנוע',
  'חיישן למדה / חמצן',
  'חיישן מנוע',
  <option value="262" className="parent">חלקי מתלה</option>
  <option value="272">בוקסות</option>
  <option value="270">זרוע מייצב</option>
  <option value="271">זרועות מתלה</option>
  <option value="269">מוט שפור</option>
  <option value="263">משולש עליון</option>
  <option value="264">משולש תחתון</option>
  <option value="273">תושבת מייצב</option>
  <option value="266">תפוח הגה</option>
  <option value="268">תפוח מתלה עליון</option>
  <option value="267">תפוח מתלה תחתון</option>
  <option value="20" className="parent">חלקי פח ומרכב</option>
  <option value="288">בולמים לדלת תא מטען</option>
  <option value="289">בולמים לשמשה אחורית</option>
  <option value="166">גג מרכב</option>
  <option value="471">גג נפתח קבריולט</option>
  <option value="60">גריל</option>
  <option value="48">דלת אחורית ימין</option>
  <option value="47">דלת אחורית שמאל</option>
  <option value="49">דלת הזזה ימין</option>
  <option value="50">דלת הזזה שמאל</option>
  <option value="52">דלת קדמית ימין</option>
  <option value="51">דלת קדמית שמאל</option>
  <option value="194">דלת שירות גדולה</option>
  <option value="195">דלת שירות קטנה</option>
  <option value="53">דלת שלישית/חמישית</option>
  <option value="57">דלת תא מטען</option>
  <option value="59">טמבון / פגוש אחורי</option>
  <option value="58">טמבון / פגוש קדמי</option>
  <option value="216">כיסויי לגלגל רזרבי</option>
  <option value="54">כנף קדמית ימין</option>
  <option value="55">כנף קדמית שמאל</option>
  <option value="165">מגן גחון</option>
  <option value="61">מיכל דלק</option>
  <option value="56">מכסה מנוע</option>
  <option value="218">סמל אחורי</option>
  <option value="217">סמל קדמי</option>
  <option value="187">סנרוף</option>
  <option value="214">ספויילר</option>
  <option value="184">פח חזית</option>
  <option value="215">פס קישוט</option>
  <option value="200">שנורקל</option>
  <option value="62">חלקי פח ומרכב - אחר</option>
  <option value="21" className="parent">חלקי פנים ופלסטיק</option>
  <option value="64">גלגל הגה</option>
  <option value="69">דאש בורד</option>
  <option value="220">ידית אורות</option>
  <option value="219">ידית איתות</option>
  <option value="70">ידית הילוכים</option>
  <option value="174">יחידת פיקוד לחלונות חשמל</option>
  <option value="65">כסא נהג</option>
  <option value="66">כסא נוסע</option>
  <option value="63">כריות אוויר</option>
  <option value="71">לוח שעונים</option>
  <option value="295">מגיני שמש</option>
  <option value="68">מגש אחורי</option>
  <option value="287">מד סל"ד</option>
  <option value="296">מתגים לחלונות חשמל</option>
  <option value="188">סוויץ'</option>
  <option value="286">ספידומטר</option>
  <option value="67">ספסל אחורי</option>
  <option value="221">קונסולה מרכזית</option>
  <option value="72">רדיו מקורי</option>
  <option value="167">ריפוד גג פנימי</option>
  <option value="222">תא כפפות</option>
  <option value="73">חלקי פנים ופלסטיק - אחר</option>
  <option value="27" className="parent">חלקים למזגן</option>
  <option value="75">מאוורר מזגן</option>
  <option value="76">מאייד</option>
  <option value="74">מדחס מזגן</option>
  <option value="77">מעבה</option>
  < value="223">מפוח</>
  <option value="78">חלקים למזגן - אחר</option>
  <option value="31" className="parent">חשמל</option>
  <option value="79">אלטרנטור</option>
  <option value="198">חיישן / מד כמות אוויר</option>
  <option value="179">כוהל הצתה</option>
  <option value="173">מנגנון הרמה לחלון חשמל</option>
  <option value="202">מנוע הגה חשמלי</option>
  <option value="292">מנוע לחלון חשמל</option>
  <option value="85">מנוע מגבים</option>
  <option value="86">מנוע צעדים</option>
  <option value="84">מפלג</option>
  <option value="82">מצבר</option>
  <option value="464">מצתי להט</option>
  <option value="473">נעילה מרכזית</option>
  <option value="228">סט הנעה / הדלקה</option>
  <option value="80">סטרטר</option>
  <option value="87">חשמל - אחר</option>
  <option value="233" className="parent">ידיות ומנעולים לדלתות</option>
  <option value="237">ידית חיצונית אחור ימין</option>
  <option value="238">ידית חיצונית אחור שמאל</option>
  <option value="240">ידית חיצונית דלת הזזה</option>
  <option value="235">ידית חיצונית נהג</option>
  <option value="236">ידית חיצונית נוסע</option>
  <option value="239">ידית חיצונית תא מטען</option>
  <option value="243">ידית פנימית אחור ימין</option>
  <option value="244">ידית פנימית אחור שמאל</option>
  <option value="245">ידית פנימית דלת הזזה</option>
  <option value="241">ידית פנימית נהג</option>
  <option value="242">ידית פנימית נוסע</option>
  <option value="248">מנעול דלת תא מטען</option>
  <option value="246">מנעול צד נהג</option>
  <option value="247">מנעול צד נוסע</option>
  <option value="249">ידיות ומנעולים - אחר</option>
  <option value="35" className="parent">מחשבים</option>
  <option value="88">מחשב ABS</option>
  <option value="93">מחשב בודי</option>
  <option value="201">מחשב הגה</option>
  <option value="89">מחשב כריות אוויר</option>
  <option value="186">מחשב מאווררים</option>
  <option value="92">מחשב מזגן</option>
  <option value="90">מחשב מנוע</option>
  <option value="185">מחשב נעילה</option>
  <option value="91">מחשב תיבת הילוכים</option>
  <option value="94">מחשבים - אחר</option>
  <option value="33" className="parent">מנוע וחלקי מכונאות</option>
  <option value="18">מנוע בנזין - שלם</option>
  <option value="178">מנוע בנזין טורבו - שלם</option>
  <option value="171">מנוע דיזל - שלם</option>
  <option value="177">מנוע טורבו דיזל - שלם</option>
  <option value="102">אינג'קטורים / מזרקים</option>
  <option value="291">אינטרקולר</option>
  <option value="172">בית פילטר אויר</option>
  <option value="98">גל ארכובה - קראנק</option>
  <option value="99">גל זיזים - קמשפט</option>
  <option value="100">טלטל+בוכנה - פיסטון</option>
  <option value="103">מאוור מנוע</option>
  <option value="97">מגדש טורבו</option>
  <option value="211">מיכל מים למגבים</option>
  <option value="209">מיכל עיבויי מים לראדיאטור</option>
  <option value="104">מערכת גז - גפ"מ</option>
  <option value="180">מצערת</option>
  <option value="250">פולי מנוע</option>
  <option value="101">קרבורטור</option>
  <option value="206">קרטר - אגן שמן מנוע</option>
  <option value="96">ראש מנוע</option>
  <option value="95">רדיאטור</option>
  <option value="191">רדיאטור מזגן</option>
  <option value="290">שסתום EGR</option>
  <option value="213">תיבת העברה - טרנספר</option>
  <option value="105">מנוע וחלקי מנוע - אחר</option>
  <option value="34" className="parent">מערכת פליטה</option>
  <option value="106">אגזוז</option>
  <option value="107">ממיר קטליטי</option>
  <option value="196">סעפת יניקה</option>
  <option value="108">סעפת פליטה</option>
  <option value="109">מערכת פליטה - אחר</option>
  <option value="25" className="parent">מראות לרכב</option>
  <option value="293">זכוכית למראה</option>
  <option value="110">מראה ימין</option>
  <option value="112">מראה מרכזית / פנימית</option>
  <option value="111">מראה שמאל</option>
  <option value="113">מראות - אחר</option>
  <option value="26" className="parent">משאבות</option>
  <option value="114">משאבת בלמים</option>
  <option value="169">משאבת דלק</option>
  <option value="116">משאבת הגה</option>
  <option value="117">משאבת הזרקה</option>
  <option value="168">משאבת לחץ סולר</option>
  <option value="197">משאבת לחץ שמן</option>
  <option value="115">משאבת מים</option>
  <option value="203">משאבת קלאץ'</option>
  <option value="118">משאבות - אחר</option>
  <option value="29" className="parent">מתלים ובולמים</option>
  <option value="119">בולם אחורי ימין</option>
  <option value="120">בולם אחורי שמאל</option>
  <option value="205">בולם הגה</option>
  <option value="121">בולם קדמי ימין</option>
  <option value="122">בולם קדמי שמאל</option>
  <option value="226">גשר אחורי</option>
  <option value="227">גשר קדמי</option>
  <option value="192">מסרק הגה</option>
  <option value="125">מתלה קדמי ימין</option>
  <option value="123">מתלה אחורי ימין</option>
  <option value="124">מתלה אחורי שמאל</option>
  <option value="126">מתלה קדמי שמאל</option>
  <option value="254">פעמון ציריה</option>
  <option value="189">ציריה ימין</option>
  <option value="190">ציריה שמאל</option>
  <option value="181">ציריות</option>
  <option value="193">קיט הגבהה</option>
  <option value="255">קיט שיפוץ פעמון</option>
  <option value="224">קפיץ עלים ימין</option>
  <option value="225">קפיץ עלים שמאל</option>
  <option value="204">תיבת הגה</option>
  <option value="127">מתלים ובולמים - אחר</option>
  <option value="36" className="parent">סרנים</option>
  <option value="183">נעילת דיפרנציאל</option>
  <option value="128">סרן אחורי / בקאקס</option>
  <option value="129">סרן קדמי / פרונטאקס</option>
  <option value="229">ציר אחורי</option>
  <option value="130">סרנים - אחר</option>
  <option value="256" className="parent">פילטרים/מסננים</option>
  <option value="257">פילטר אוויר</option>
  <option value="258">פילטר דלק</option>
  <option value="260">פילטר מזגן</option>
  <option value="259">פילטר שמן</option>
  <option value="261">פילטר תיבת הילוכים</option>
  <option value="28" className="parent">פנסים לרכב</option>
  <option value="138">פנס ראשי ימין</option>
  <option value="139">פנס ראשי שמאל</option>
  <option value="470">ליטוש פנסים</option>
  <option value="232">מחזיר אור תא מטען</option>
  <option value="142">פנס איתות קדמי ימין</option>
  <option value="136">פנס אחורי ימין</option>
  <option value="137">פנס אחורי שמאל</option>
  <option value="140">פנס איתות אחורי ימין</option>
  <option value="141">פנס איתות אחורי שמאל</option>
  <option value="143">פנס איתות קדמי שמאל</option>
  <option value="230">פנס ערפל ימין</option>
  <option value="231">פנס ערפל שמאל</option>
  <option value="145">פנסים ותאורה - אחר</option>
  <option value="274" className="parent">צינורות לרכב</option>
  <option value="279">צינור בלם</option>
  <option value="275">צינור דלק</option>
  <option value="280">צינור הגה כח</option>
  <option value="277">צינור הידראולי</option>
  <option value="284">צינור וואקום</option>
  <option value="278">צינור לחץ שמן</option>
  <option value="281">צינור מזגן</option>
  <option value="283">צינור מים לרדיאטור</option>
  <option value="282">צינור שמן גיר</option>
  <option value="276">צינור שמן מנוע</option>
  <option value="285">צינור אחר</option>
  <option value="22" className="parent">שמשות / חלונות</option>
  <option value="151">חלון צד - אחורי ימין</option>
  <option value="152">חלון צד - אחורי שמאל</option>
  <option value="153">חלון צד - קדמי נהג</option>
  <option value="154">חלון צד - קדמי נוסע</option>
  <option value="155">שמשה אחורית</option>
  <option value="156">שמשה קדמית</option>
  <option value="157">שמשות / חלונות - אחר</option>
  <option value="370" className="parent">תושבות</option>
  <option value="372">תושבת אגזוז</option>
  <option value="469">תושבת בולם</option>
  <option value="466">תושבת גיר</option>
  <option value="371">תושבת מנוע</option>
  <option value="19" className="parent">תיבת הילוכים - גיר</option>
  <option value="182">גלגל תנופה</option>
  <option value="472">מוח לגיר</option>
  <option value="160">מצמד / קלאץ'</option>
  <option value="159">תיבת הילוכים אוטומטית</option>
  <option value="158">תיבת הילוכים ידנית</option>
  <option value="161">תיבת הילוכים - אחר</option>
  <option value="37" className="parent">חלקים אחרים</option>
  <option value="164">חלק אחר כלשהו</option>
];
const VehicleOptions = ['מכוניות', 'אופנועים', 'אופניים', 'כלי שטח', 'כל שייט', 'כלי טייס'];
const modelOptions = ['A4 Cabriolet', 'TT', 'Golf VR6', 'GTS 812', 'AMG GT R Roadster', 'Z4', 'GHIBLI'];
const YearOptions = ['1995', '2000', '2005', '2010', '2015', '2020'];

export default {
  name: "AddItem",
  props: ['tableName', 'item'],
  data() {
    return {
      alert: false,
      flag: false,
      localEditedItem: {
        manufacturer: '',
        status: '',
        textPart: '',
        Vehicle: '',
        model: '',
        numberPart: '',
        pricePart: '',
        quantityPart: '',
        selectYear: '',
        image: null,
        imgName: '',
        url: '',
        privateItem: false
      },
      userData: {
        phone: '',
        name: '',
      },
      imageUpload: [],
      manufacturerOptions, VehicleOptions, modelOptions, YearOptions,
      options: manufacturerOptions,
    }
  },
  computed: {
    ...mapState('items', ['editedItem']),
    ...mapState('users', ['userStore', 'privateUser']),
    // this.privateUser.phone

  },
  methods: {
    ...mapActions('items', ['insertItem', 'updateItem', 'setEditItemById', 'getUserDetails']),
    ...mapActions('users', ['getUserInfo', 'getStoreInfo', 'getStores', 'getUsers']),
    ...mapMutations('items', ['setEditedItem', 'setEditedItemId']),

    localSetEditedItem() {
      debugger
      if (this.userStore.imStore) {
        this.userData.phone = this.userStore.phone,
            this.userData.name = this.userStore.userName
      } else {
        debugger
        this.localEditedItem.privateItem = true;
        this.userData.phone = this.privateUser.phone,
            this.userData.name = this.privateUser.userName
      }
      Object.assign(this.localEditedItem, this.userData)
      this.setEditedItem(this.localEditedItem)
    },

    imageSelected(file) {
      this.localEditedItem.image = file;
      console.log(this.localEditedItem.image);
    },

    async insert() {
      // if (){}
      this.localSetEditedItem();
      debugger
      this.insertItem();
      this.alert = true
      await this.goToHome();
    },

    async update() {
      this.flag = true;
      debugger
      await this.localSetEditedItem();
      await this.updateItem();
      await this.goToProfile();
    },

    goToProfile() {
      this.$router.push(`/profile/${window.user.uid}`);
    },

    goToHome() {
      this.$router.push('/home');
    }
  },

  created() {
    this.getUserInfo();
    this.getStoreInfo();
  },
  mounted() {
    if (this.$route.params.id) {
      this.setEditedItemId(this.$route.params.id);
      this.setEditItemById()
          .then(() => {
            Object.assign(this.localEditedItem, this.editedItem);
          })
    }
  }
}
</script>

<style>

</style>