import { createSlice } from '@reduxjs/toolkit';

interface CategoryState {
  categories: Array<{
    title: string;
    icon: string;
  }>;
}

const initialState: CategoryState = {
  categories: [
    {
      title: 'ห้องสมุด',
      icon: '/assets/images/scolls/pt-forum-library.svg',
    },
    {
      title: 'สยามสแควร์',
      icon: '/assets/images/scolls/pt-forum-siam.svg',
    },
    {
      title: 'กรีนโซน',
      icon: '/assets/images/scolls/pt-forum-greenzone.svg',
    },
    {
      title: 'กล้อง',
      icon: '/assets/images/scolls/pt-forum-camera.svg',
    },
    {
      title: 'แก็ตแจ็ต',
      icon: '/assets/images/scolls/pt-forum-gadget.svg',
    },
    {
      title: 'ไกลบ้าน',
      icon: '/assets/images/scolls/pt-forum-klaibann.svg',
    },
    {
      title: 'เฉลิมกรุง',
      icon: '/assets/images/scolls/pt-forum-chalermkrung.svg',
    },
    {
      title: 'ชานเรือน',
      icon: '/assets/images/scolls/pt-forum-family.svg',
    },
    {
      title: 'ดิโอลด์สยาม',
      icon: '/assets/images/scolls/pt-forum-theoldsiam.svg',
    },
    {
      title: 'ถนนนักเขียน',
      icon: '/assets/images/scolls/pt-forum-writer.svg',
    },
    {
      title: 'บางขุนพรหม',
      icon: '/assets/images/scolls/pt-forum-tvshow.svg',
    },
    {
      title: 'พรหมชาติ',
      icon: '/assets/images/scolls/pt-forum-horoscope.svg',
    },
    {
      title: 'ภูมิภาค',
      icon: '/assets/images/scolls/pt-forum-region.svg',
    },
    {
      title: 'รวมมิตร',
      icon: '/assets/images/scolls/pt-forum-all.svg',
    },
    {
      title: 'ราชดำเนิน',
      icon: '/assets/images/scolls/pt-forum-rajdumnern.svg',
    },
    {
      title: 'ศาลาประชาคม',
      icon: '/assets/images/scolls/pt-forum-social.svg',
    },
    {
      title: 'ศุภชลาศัย',
      icon: '/assets/images/scolls/pt-forum-supachalasai.svg',
    },
    {
      title: 'หว้ากอ',
      icon: '/assets/images/scolls/pt-forum-wahkor.svg',
    },
    {
      title: 'ซิลิคอนวัลเลย์',
      icon: '/assets/images/scolls/pt-forum-siliconvalley.svg',
    },
    {
      title: 'ก้นครัว',
      icon: '/assets/images/scolls/pt-forum-food.svg',
    },
    {
      title: 'กรุงโซล',
      icon: '/assets/images/scolls/pt-forum-korea.svg',
    },
    {
      title: 'การ์ตูน',
      icon: '/assets/images/scolls/pt-forum-cartoon.svg',
    },
    {
      title: 'แกลเลอรี่',
      icon: '/assets/images/scolls/pt-forum-gallery.svg',
    },
    {
      title: 'จตุจักร',
      icon: '/assets/images/scolls/pt-forum-jatujak.svg',
    },
    {
      title: 'เฉลิมไทย',
      icon: '/assets/images/scolls/pt-forum-chalermthai.svg',
    },
    {
      title: 'ชายคา',
      icon: '/assets/images/scolls/pt-forum-home.svg',
    },
    {
      title: 'โต๊ะเครื่องแป้ง',
      icon: '/assets/images/scolls/pt-forum-beauty.svg',
    },
    {
      title: 'บลูแพลนเน็ต',
      icon: '/assets/images/scolls/pt-forum-blueplanet.svg',
    },
    {
      title: 'บางรัก',
      icon: '/assets/images/scolls/pt-forum-bangrak.svg',
    },
    {
      title: 'พันทิป',
      icon: '/assets/images/scolls/pt-forum-pantip.svg',
    },
    {
      title: 'มาบุญครอง',
      icon: '/assets/images/scolls/pt-forum-mbk.svg',
    },
    {
      title: 'รัชดา',
      icon: '/assets/images/scolls/pt-forum-ratchada.svg',
    },
    {
      title: 'ไร้สังกัด',
      icon: '/assets/images/scolls/pt-forum-isolate.svg',
    },
    {
      title: 'ศาสนา',
      icon: '/assets/images/scolls/pt-forum-religious.svg',
    },
    {
      title: 'สวนลุมพินี',
      icon: '/assets/images/scolls/pt-forum-lumpini.svg',
    },
    {
      title: 'สีลม',
      icon: '/assets/images/scolls/pt-forum-silom.svg',
    },
    {
      title: 'หอศิลป์',
      icon: '/assets/images/scolls/pt-forum-art.svg',
    },
  ],
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
});

export default categoriesSlice.reducer;
