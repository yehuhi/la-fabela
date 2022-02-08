<template>
  <div class="q-pa-md" dir="rtl">
    <p style="text-align: center; font-weight: bold; font-size: 35px; color: #ffce0c">חיפוש חלקים</p>
    <div class="row" style="padding: 5px 15px 5px 45px">
      <q-checkbox v-if="!localEditedInputs.oldStatus && !localEditedInputs.newStatus" class="col-4  col-sm-3" size="lg"
                  keep-color v-model="localEditedInputs.allStatus"
                  val="הכל"
                  label="הכל"
                  color="orange-6"
                  style="font-size: 25px;font-weight: bold; color: #ff9725"/>
      <q-checkbox v-if="!localEditedInputs.allStatus && !localEditedInputs.oldStatus" class="col-4  col-sm-3" size="lg"
                  keep-color v-model="localEditedInputs.newStatus"
                  val="חדש" label="חדש"
                  color="yellow-8" style="font-size: 25px;font-weight: bold; color: #ffcf00"/>
      <q-checkbox v-if="!localEditedInputs.allStatus && !localEditedInputs.newStatus" class="col-4  col-sm-3" size="lg"
                  keep-color v-model="localEditedInputs.oldStatus"
                  val="משומש" label="משומש"
                  color="yellow-8" style="font-size: 25px;font-weight: bold; color: #ffcf00"/>
    </div>

    <div class="row" style="padding: 0 10px 40px 10px; direction: rtl; margin:0 -10px 0 10px">

      <q-select class="col-12 col-sm-4"
                style="padding: 15px"
                bg-color="yellow-7"
                outlined
                standout="bg-yellow-7"
                v-model="localEditedInputs.manufacturer"
                :options="manufacturerOptions"
                behavior="menu"
                label="יצרן"/>
      <q-select class="col-12 col-sm-4" bg-color="yellow-7" outlined
                style="padding: 15px"
                standout="bg-yellow-7"
                v-model="localEditedInputs.model" :options="carOptions" behavior="menu" label="דגם"/>
      <q-select class="col-12 col-sm-4" bg-color="yellow-7" outlined
                style="padding: 15px"
                standout="bg-yellow-7"
                v-model="localEditedInputs.selectYear" :options="YearOptions" behavior="menu" label="שנה"/>
      <q-select
          class="col-12 col-sm-4" bg-color="yellow-7" outlined
          style="padding: 15px"
          standout="bg-yellow-7"
          v-model="localEditedInputs.textPart"
          use-input
          input-debounce="0"
          label="שם החלק"
          :options="options"
          @filter="filterFn"
          behavior="menu"/>
      <q-input class="col-12 col-sm-4" bg-color="yellow-7" clearable clear-icon="close" outlined
               style="padding: 15px"
               v-model="localEditedInputs.location" label="מיקום בארץ"/>
      <q-input class="col-12 col-sm-4" bg-color="yellow-7" clearable clear-icon="close"
               style="padding: 15px "
               prefix="#"
               outlined
               v-model="localEditedInputs.numberPart" label="ברקוד"/>
    </div>
    <div class="row justify-center">
      <q-btn v-if="" type="reset"
             style="background-color: #ffce0c; font-size: 20px;top: -18px; width: 150px" label="חיפוש"
             @click="search()"/>
    </div>
    <q-dialog v-model="alert">
      <q-card style="width: 90%; height: 200px; background-color: #ff6767; border-radius: 20px">
        <q-card-section>
          <div class="text-h3" style="text-align: right; font-weight: bold">:אזהרה</div>
        </q-card-section>

        <q-card-section class="q-pt-none" style="text-align: right">
          <p style="margin: 20px 10px 0 0;font-size: 25px">
            ! נא למלא יותר פרטים
          </p>
        </q-card-section>
        <q-card-actions align="left">
          <q-btn flat label="OK" color="blue" v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <Cards :flag="flag" :privateParts="privateParts"/>
    <Cards :flag="flag" :storeParts="storeParts"/>

  </div>
</template>

<script>

import Search from "../components/Search";
import {mapActions, mapMutations, mapState} from "vuex";
import Cards from "../components/Cards";

const manufacturerOptions = ['AUDI', 'VOLKSWAGEN', 'FERRARI', 'MERCEDES-BENZ', 'B.M.W', 'MASERATI'];
const modelOptionsAudi = ['A1', 'A3 coupe', 'A4 Cabriolet', 'A5', 'A6', 'A7', 'e-tron', 'Q2', 'Q3', 'Q3 Sportback', 'Q7', 'TT', 'R8'];
const modelOptionsVolkswagen = ['Polo', 'Touareg', 'Beetle', 'Golf', 'Golf VR6', 'Jetta', 'Passat', 'Scirocco', 'T‑Cross'];
const modelOptionsFerrari = ['Roma', 'Portofino', 'F8 Tributo', 'SF90 Stradale', 'California T', '488 Spider', 'f12tdf', 'GTS 812'];
const modelOptionsMercedes = ['A-Class', 'C-Class', 'CLA-Class', 'CLS-Class', 'E-Class', 'S-Class', 'GLA-Class', 'GLC-Class', 'G-Class', 'SL-Class', 'AMG GT COUPE', 'AMG GT R Roadster'];
const modelOptionsBmw = ['X5 (E53)', 'Z8', 'X3 (E83)', 'X5 (E70)', 'X6 (E71)', 'F07', 'F10', 'F11', 'i3', 'iX3', 'i4', 'i8', 'G42', 'U06', 'F16', 'Z3', 'Z4',];
const modelOptionsMaserati = ['Shamal', 'Quattroporte V', 'GranTurismo', 'Ghibli III', 'Ghibli III S'];
const YearOptions = ['1990', '1991', '1992', '1993', '1994', '1995', '1996', '1997', '1998', '1999', '2000',
  '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013',
  '2014', '2015', '2020', '2021', '2022'];
const nameParts = [
  'רכב שלם',
  'רכב שלם לפירוק',
  'בלמים או ברקסים',
  'צלחות בלם אחוריות',
  'צלחות בלם קדמיות',
  'קליפר ימין',
  'קליפר שמאל',
  'רפידות בלם',
  'גלגלים',
  'גיר שלם',
  "ג'אנט ברזל",
  "ג'אנט מגנזיום",
  'סט קפיצים',
  'מערכת מולטימדיה',
  'טסות',
  'צמיגים',
  'גלגלים',
  'חיישנים',
  'חיישן אוויר',
  'חיישן אורות',
  'חיישן גיר',
  'חיישן הצתה',
  'חיישן חום מנוע',
  'חיישן למדה או חמצן',
  'חיישן מנוע',
  'חלקי מתלה',
  'בוקסות',
  'זרוע מייצב',
  'זרועות מתלה',
  'מוט שפור',
  'משולש עליון',
  'משולש תחתון',
  'תושבת מייצב',
  'תפוח הגה',
  'תפוח מתלה עליון',
  'תפוח מתלה תחתון',
  'חלקי פח ומרכב',
  'בולמים לדלת תא מטען',
  'בולמים לשמשה אחורית',
  'גג מרכב',
  'גג נפתח קבריולט',
  'גריל',
  'דלת אחורית ימין',
  'דלת אחורית שמאל',
  'דלת הזזה ימין',
  'דלת הזזה שמאל',
  'דלת קדמית ימין',
  'דלת קדמית שמאל',
  'דלת שירות גדולה',
  'דלת שירות קטנה',
  'דלת שלישית או חמישית',
  'דלת תא מטען',
  'טמבון או פגוש אחורי',
  'טמבון או פגוש קדמי',
  'כיסויי לגלגל רזרבי',
  'כנף קדמית ימין',
  'כנף קדמית שמאל',
  'מגן גחון',
  'מיכל דלק',
  'מכסה מנוע',
  'סמל אחורי',
  'סמל קדמי',
  'סנרוף',
  'ספויילר',
  'פח חזית',
  'פס קישוט',
  'שנורקל',
  'חלקי פח ומרכב',
  'חלקי פנים ופלסטיק',
  'גלגל הגה',
  'דאש בורד',
  'ידית אורות',
  'ידית איתות',
  'ידית הילוכים',
  'יחידת פיקוד לחלונות חשמל',
  'כסא נהג',
  'כסא נוסע',
  'כריות אוויר',
  'לוח שעונים',
  'מגיני שמש',
  'מגש אחורי',
  'מד סל"ד',
  'מתגים לחלונות חשמל',
  'סוויץ',
  'ספידומטר',
  'ספסל אחורי',
  'קונסולה מרכזית',
  'רדיו מקורי',
  'ריפוד גג פנימי',
  'תא כפפות',
  'חלקי פנים ופלסטיק',
  'חלקים למזגן',
  'מאוורר מזגן',
  'מאייד',
  'מדחס מזגן',
  'מעבה',
  'מפוח',
  'חלקים למזגן',
  'חשמל',
  'אלטרנטור',
  'חיישן מד כמות אוויר',
  'כוהל הצתה',
  'מנגנון הרמה לחלון חשמל',
  'מנוע הגה חשמלי',
  'מנוע לחלון חשמל',
  'מנוע מגבים',
  'מנוע צעדים',
  'מפלג',
  'מצבר',
  'מצתי להט',
  'נעילה מרכזית',
  'סט הנעה או הדלקה',
  'סטרטר',
  'חשמל',
  'ידיות ומנעולים לדלתות',
  'ידית חיצונית אחור ימין',
  'ידית חיצונית אחור שמאל',
  'ידית חיצונית דלת הזזה',
  'ידית חיצונית נהג',
  'ידית חיצונית נוסע',
  'ידית חיצונית תא מטען',
  'ידית פנימית אחור ימין',
  'ידית פנימית אחור שמאל',
  'ידית פנימית דלת הזזה',
  'ידית פנימית נהג',
  'ידית פנימית נוסע',
  'מנעול דלת תא מטען',
  'מנעול צד נהג',
  'מנעול צד נוסע',
  'ידיות ומנעולים',
  'מחשבים',
  'מחשב ABS',
  'מחשב בודי',
  'מחשב הגה',
  'מחשב כריות אוויר',
  'מחשב מאווררים',
  'מחשב מזגן',
  'מחשב מנוע',
  'מחשב נעילה',
  'מחשב תיבת הילוכים',
  'מחשבים',
  'מנוע וחלקי מכונאות',
  'מנוע בנזין שלם',
  'מנוע בנזין טורבו שלם',
  'מנוע דיזל שלם',
  'מנוע טורבו דיזל שלם',
  "אינג'קטורים או מזרקים",
  'אינטרקולר',
  'בית פילטר אויר',
  'גל ארכובה או קראנק',
  'גל זיזים או קמשפט',
  'טלטל + בוכנה או פיסטון',
  'מאוור מנוע',
  'מגדש טורבו',
  'מיכל מים למגבים',
  'מיכל עיבויי מים לראדיאטור',
  'מערכת גז או גפ"מ',
  'מצערת',
  'פולי מנוע',
  'קרבורטור',
  'קרטר או אגן שמן מנוע',
  'ראש מנוע',
  'רדיאטור',
  'רדיאטור מזגן',
  'שסתום EGR',
  'תיבת העברה או טרנספר',
  'מנוע וחלקי מנוע',
  'מערכת פליטה',
  'אגזוז',
  'ממיר קטליטי',
  'סעפת יניקה',
  'סעפת פליטה',
  'מערכת פליטה',
  'מראות לרכב',
  'זכוכית למראה',
  'מראה ימין',
  'מראה מרכזית פנימית',
  'מראה שמאל',
  'מראות',
  'משאבות',
  'משאבת בלמים',
  'משאבת דלק',
  'משאבת הגה',
  'משאבת הזרקה',
  'משאבת לחץ סולר',
  'משאבת לחץ שמן',
  'משאבת מים',
  "משאבת קלאץ'",
  'משאבות',
  'מתלים ובולמים',
  'בולם אחורי ימין',
  'בולם אחורי שמאל',
  'בולם הגה',
  'בולם קדמי ימין',
  'בולם קדמי שמאל',
  'גשר אחורי',
  'גשר קדמי',
  'מסרק הגה',
  'מתלה קדמי ימין',
  'מתלה אחורי ימין',
  'מתלה אחורי שמאל',
  'מתלה קדמי שמאל',
  'פעמון ציריה',
  'ציריה ימין',
  'ציריה שמאל',
  'ציריות',
  'קיט הגבהה',
  'קיט שיפוץ פעמון',
  'קפיץ עלים ימין',
  'קפיץ עלים שמאל',
  'תיבת הגה',
  'מתלים ובולמים',
  'סרנים',
  'נעילת דיפרנציאל',
  'סרן אחורי או בקאקס',
  'סרן קדמי או פרונטאקס',
  'ציר אחורי',
  'סרנים',
  'פילטרים או מסננים',
  'פילטר אוויר',
  'פילטר דלק',
  'פילטר מזגן',
  'פילטר שמן',
  'פילטר תיבת הילוכים',
  'פנסים לרכב',
  'פנס ראשי ימין',
  'פנס ראשי שמאל',
  'ליטוש פנסים',
  'מחזיר אור תא מטען',
  'פנס איתות קדמי ימין',
  'פנס אחורי ימין',
  'פנס אחורי שמאל',
  'פנס איתות אחורי ימין',
  'פנס איתות אחורי שמאל',
  'פנס איתות קדמי שמאל',
  'פנס ערפל ימין',
  'פנס ערפל שמאל',
  'פנסים ותאורה',
  'צינורות לרכב',
  'צינור בלם',
  'צינור דלק',
  'צינור הגה כח',
  'צינור הידראולי',
  'צינור וואקום',
  'צינור לחץ שמן',
  'צינור מזגן',
  'צינור מים לרדיאטור',
  'צינור שמן גיר',
  'צינור שמן מנוע',
  'צינור אחר',
  'שמשות - חלונות',
  'חלון צד אחורי ימין',
  'חלון צד אחורי שמאל',
  'חלון צד קדמי נהג',
  'חלון צד קדמי נוסע',
  'שמשה אחורית',
  'שמשה קדמית',
  'שמשות או חלונות',
  'תושבות',
  'תושבת אגזוז',
  'תושבת בולם',
  'תושבת גיר',
  'תושבת מנוע',
  'תיבת הילוכים לגיר',
  'גלגל תנופה',
  'מוח לגיר',
  'מצמד או קלאץ',
  'תיבת הילוכים אוטומטית',
  'תיבת הילוכים ידנית',
  'תיבת הילוכים',
  'חלקים אחרים',
  'צופר',

];


export default {
  name: "SearchItems",
  components: {Search, Cards},
  data() {
    return {
      flag: true,
      alert: false,
      privateParts: true,
      storeParts: true,
      searchi: true,
      searcho: '',
      status: '',
      checkBoxStatus: '',
      localEditedInputs: {
        allStatus: false,
        newStatus: false,
        oldStatus: false,
        checkBoxStatus: '',
        textPart: '',
        manufacturer: '',
        model: '',
        selectYear: '',
        numberPart: '',
        location: ''
      },
      manufacturerOptions,
      modelOptionsAudi,
      modelOptionsVolkswagen,
      modelOptionsFerrari,
      modelOptionsMercedes,
      modelOptionsBmw,
      modelOptionsMaserati,
      modelOptions: '',
      YearOptions,
      options: nameParts
    }
  },
  computed: {
    ...mapState('items', ['itemsFilterSearch']),
    carOptions: function () {
      debugger
      if (this.localEditedInputs.manufacturer === 'AUDI') {
        return modelOptionsAudi;
      } else if (this.localEditedInputs.manufacturer === 'VOLKSWAGEN') {
        return modelOptionsVolkswagen;
      } else if (this.localEditedInputs.manufacturer === 'FERRARI') {
        return modelOptionsFerrari;
      } else if (this.localEditedInputs.manufacturer === 'MERCEDES-BENZ') {
        return modelOptionsMercedes;
      } else if (this.localEditedInputs.manufacturer === 'B.M.W') {
        return modelOptionsBmw;
      } else if (this.localEditedInputs.manufacturer === 'MASERATI') {
        return modelOptionsMaserati;
      }
    }
  },
  methods: {
    ...mapActions('items', ['insertItem', 'getPrivateItems', 'getStoreItems', 'getUserDetails']),
    ...mapActions('users', ['getUserInfo', 'getStoreInfo']),
    ...mapMutations('items', ['setFilterItems']),
    search() {
      debugger
      if (this.localEditedInputs) {
        if (this.localEditedInputs.allStatus && !this.localEditedInputs.manufacturer) {
          this.alert = true;
          return
        } else if (this.localEditedInputs.newStatus && !this.localEditedInputs.manufacturer) {
          this.alert = true;
          return
        } else if (this.localEditedInputs.oldStatus && !this.localEditedInputs.manufacturer) {
          this.alert = true;
          return
        } else if (this.localEditedInputs.newStatus) {
          this.status = 'itemsStore';
        } else if (this.localEditedInputs.oldStatus) {
          this.status = 'itemsPrivate';
        } else if (this.localEditedInputs.allStatus) {
          this.status = 'all';
        } else {
          this.alert = true;
          return
        }
        debugger
        this.searcho = this.localEditedInputs.textPart;
        this.setFilterItems(this.localEditedInputs);
        this.insertItem(this.searchi);
        // this.$router.push('/search');
        debugger
        this.$router.push(`/search/${this.localEditedInputs.textPart}&&${this.localEditedInputs.manufacturer}&&${this.localEditedInputs.model}&&${this.localEditedInputs.selectYear}&&${this.localEditedInputs.location}&&${this.status}`)
      }
    },
    filterFn(val, update) {
      if (val === '') {
        update(() => {
          this.options = nameParts;
        })
        return
      }
      update(() => {
        const needle = val.toLowerCase()
        this.options = nameParts.filter(v => v.toLowerCase().indexOf(needle) > -1)
      })
    }
  },
  async created() {
    debugger
    window.scrollTo(0, 0);
    if (window.user) {
      debugger
      await this.getStoreInfo();
      await this.getUserInfo();
    }
    await this.getPrivateItems();
    await this.getStoreItems();
  }
}
</script>

<style>
.q-field__label {
  left: unset;
}

.q-field--float .q-field__label {
  right: unset;
}

</style>