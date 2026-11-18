import { ProphetEntry, SirahEra, SirahEvent } from '../types/timeline';

export const SIRAH_ERA_META: Record<
  SirahEra,
  {
    label: string;
    span: string;
    summary: string;
  }
> = {
  early_life: {
    label: 'Early Life, Orphanhood & Trustworthiness',
    span: '570 – 610 CE',
    summary:
      'Birth in Makkah during the Year of the Elephant, infancy with Banu Sa‘d, orphanhood, trade journeys, Hilf al-Fudul, marriage to Khadijah (RA), and arbitration of the Black Stone.',
  },
  makkan_dawah: {
    label: 'Makkan Revelation, Persecution & Steadfastness',
    span: '610 – 622 CE',
    summary:
      'First revelation in Cave Hira, secret & open call at Mount Safa, migration to Abyssinia, three-year boycott, Year of Sorrow, Ta’if, Al-Isra wal-Mi‘raj, and Pledges of Aqabah.',
  },
  madinan_state: {
    label: 'Madinah, Statehood, Treaties & Defensive Wars',
    span: '1 – 8 AH (622 – 629 CE)',
    summary:
      'The Hijrah, Masjid al-Nabawi, Constitution of Madinah, Battles of Badr, Uhud, Banu Nadir, Al-Muraysi‘, Khandaq (Trench), Treaty of Hudaybiyyah, Khaybar, and Mu’tah.',
  },
  final_years: {
    label: 'Victory, Completion & Prophetic Legacy',
    span: '8 – 11 AH (630 – 632 CE)',
    summary:
      'Bloodless Conquest of Makkah, Battle of Hunayn, Siege of Ta’if, Expedition of Tabuk, Year of Delegations, Farewell Pilgrimage, and passing in Madinah.',
  },
};

export const SIRAH_EVENTS: SirahEvent[] = [
  {
    id: 'sirah-year-elephant',
    order: 1,
    era: 'early_life',
    category: 'milestone',
    yearLabel: '570 CE · Year of the Elephant',
    title: 'Birth of Prophet Muhammad ﷺ in Makkah',
    where: 'Shi‘b Abi Talib, Makkah (Arabia)',
    whatSummary:
      'Born on a Monday in Rabi al-Awwal in the Year of the Elephant—the same year Allah destroyed Abraha’s advancing army to protect the Ka‘bah. His father Abdullah had already passed away in Madinah during a return trade journey.',
    howNarrative:
      'His grandfather Abd al-Muttalib carried the newborn into the Sacred Sanctuary to thank Allah and named him Muhammad ("The Frequently Praised"). Shortly after, he was entrusted to Halimah al-Sa‘diyyah of Banu Sa‘d in the highland desert near Ta’if, where he grew strong and mastered pure classical Arabic—and where angels opened and purified his chest as a young boy.',
    revelations: [
      {
        surahNumber: 105,
        ayahNumber: 1,
        ayahRangeLabel: 'Surah Al-Fil 105:1–5',
        contextEnglish:
          'Recalls Allah’s protection of the Ka‘bah against Abraha’s elephant army in the exact year of the Prophet’s ﷺ birth.',
      },
    ],
    hadiths: [
      {
        source: 'Sahih Muslim 1162',
        narrator: 'Abu Qatadah al-Ansari (RA)',
        textEnglish:
          'The Messenger of Allah ﷺ was asked about fasting on Mondays, and he said: "That is the day on which I was born and the day on which revelation was sent down to me."',
      },
      {
        source: 'Sahih Muslim 162',
        narrator: 'Anas ibn Malik (RA)',
        textEnglish:
          'Jibril came to the Messenger of Allah ﷺ while he was playing with other boys [in Banu Sa‘d]. He took hold of him, laid him down, split his chest, extracted the heart, removed a black clot saying "This is the portion of Satan in you," washed it in a golden vessel with Zamzam water, and restored it intact.',
      },
    ],
  },
  {
    id: 'sirah-orphanhood-shepherd',
    order: 2,
    era: 'early_life',
    category: 'milestone',
    yearLabel: '576 – 582 CE (Ages 6 – 12)',
    title: 'Orphanhood, Guardianship Under Abu Talib & Shepherding',
    where: 'Al-Abwa, Makkah, and Busra (Syria Caravan Route)',
    whatSummary:
      'His mother Aminah passed away at Al-Abwa when he was six; his loving grandfather Abd al-Muttalib passed away when he was eight, entrusting him to his uncle Abu Talib.',
    howNarrative:
      'To assist his uncle’s modest household, the young Muhammad ﷺ herded sheep in the valleys around Makkah for small wages—cultivating patience, vigilance, and humility. At age twelve, he accompanied Abu Talib’s merchant caravan north toward Busra in Syria, gaining early familiarity with peoples beyond Makkah.',
    revelations: [
      {
        surahNumber: 93,
        ayahNumber: 6,
        ayahRangeLabel: 'Surah Ad-Duha 93:6–8',
        contextEnglish:
          'Reminds the Prophet ﷺ: "Did He not find you an orphan and give you refuge? And He found you lost and guided you, and found you poor and made you self-sufficient."',
      },
    ],
    hadiths: [
      {
        source: 'Sahih al-Bukhari 2262',
        narrator: 'Abu Hurayrah (RA)',
        textEnglish:
          'The Prophet ﷺ said: "Allah did not send any prophet but that he shepherded sheep." His companions asked, "And you?" He replied: "Yes, I used to shepherd them for the people of Makkah for some qirats (small coins)."',
      },
    ],
  },
  {
    id: 'sirah-hilf-khadijah-kabah',
    order: 3,
    era: 'early_life',
    category: 'milestone',
    yearLabel: '590 – 605 CE (Ages 20 – 35)',
    title: 'Hilf al-Fudul, Marriage to Khadijah (RA) & Black Stone Arbitration',
    where: 'Makkah · House of Ibn Jud‘an & Al-Masjid al-Haram',
    whatSummary:
      'Known across Makkah as As-Sadiq Al-Amin (The Truthful, The Trustworthy), he joined the anti-oppression pact (Hilf al-Fudul), married Khadijah bint Khuwaylid (RA) at 25, and prevented inter-tribal war during the Ka‘bah’s reconstruction at 35.',
    howNarrative:
      'When Quraysh clans nearly drew swords over who would lift the Black Stone (Hajar al-Aswad) back into the rebuilt Ka‘bah, they agreed the next person entering the sanctuary would arbitrate. When Muhammad ﷺ entered they exclaimed "Al-Amin!" He spread his cloak, placed the stone in the middle, and had every clan chief lift an edge together before setting it in place with his own hands.',
    revelations: [],
    hadiths: [
      {
        source: 'Sahih al-Bukhari 3820 & 3818',
        narrator: 'Aishah & Abu Hurayrah (RA)',
        textEnglish:
          'Jibril came to the Prophet ﷺ and said: "Give Khadijah glad tidings of a palace of Qasab (hollowed pearl) in Paradise, wherein there is neither noise nor fatigue," because she believed in him when others denied him and supported him with her wealth and person.',
      },
    ],
  },
  {
    id: 'sirah-cave-hira',
    order: 4,
    era: 'makkan_dawah',
    category: 'revelation',
    yearLabel: '610 CE · Ramadan (Age 40)',
    title: 'First Revelation in the Cave of Hira',
    where: 'Cave of Hira (Jabal al-Nur), overlooking Makkah',
    whatSummary:
      'During solitary contemplation and worship in Ramadan, Angel Jibril (AS) appeared and commanded Muhammad ﷺ three times to "Read!"—revealing the opening five verses of Surah Al-‘Alaq.',
    howNarrative:
      'Overwhelmed by the majesty of revelation, he rushed home trembling to Khadijah (RA), crying "Cover me, cover me!" She reassured him immediately with unshakable conviction in his noble character and brought him to her Christian scholar cousin Waraqah ibn Nawfal, who confirmed that the same Namus (Archangel of revelation) sent to Moses had descended upon him.',
    revelations: [
      {
        surahNumber: 96,
        ayahNumber: 1,
        ayahRangeLabel: 'Surah Al-‘Alaq 96:1–5',
        contextEnglish:
          'The very first verses revealed in Islam: "Read in the name of your Lord who created... Who taught by the pen."',
      },
    ],
    hadiths: [
      {
        source: 'Sahih al-Bukhari 3',
        narrator: 'Aishah (RA)',
        textEnglish:
          'Khadijah comforted him: "Never! By Allah, Allah will never disgrace you. You keep good relations with kin, help the poor and destitute, serve guests generously, and assist those struck by true calamity."',
      },
    ],
  },
  {
    id: 'sirah-secret-to-open-dawah',
    order: 5,
    era: 'makkan_dawah',
    category: 'revelation',
    yearLabel: '610 – 615 CE',
    title: 'Early Converts, Dar al-Arqam & Open Call at Mount Safa',
    where: 'Dar al-Arqam & Mount Safa, Makkah',
    whatSummary:
      'For three years revelation spread quietly to closest family and friends—Khadijah, Abu Bakr, Ali, Zayd, and Uthman—before Allah commanded open proclamation to Quraysh.',
    howNarrative:
      'Standing atop Mount Safa, the Prophet ﷺ asked Quraysh if they would trust him were he to warn of cavalry behind the ridge. "Yes, we have never experienced anything from you except truth," they answered. Yet when he warned them to worship Allah alone, Abu Lahab shouted curses—and early converts such as Bilal, Ammar, Yasir, and Sumayyah endured brutal torture rather than renounce Tawhid.',
    revelations: [
      {
        surahNumber: 74,
        ayahNumber: 1,
        ayahRangeLabel: 'Surah Al-Muddaththir 74:1–5',
        contextEnglish: 'Resumption of revelation after a brief pause, commanding the Prophet ﷺ to arise and warn.',
      },
      {
        surahNumber: 26,
        ayahNumber: 214,
        ayahRangeLabel: 'Surah Ash-Shu‘ara 26:214',
        contextEnglish: 'Direct divine command: "And warn, [O Muhammad], your closest kindred."',
      },
    ],
    hadiths: [
      {
        source: 'Sahih al-Bukhari 4770',
        narrator: 'Ibn Abbas (RA)',
        textEnglish:
          'When "And warn your closest kindred" was revealed, the Prophet ﷺ climbed Safa and called every clan of Quraysh by name. All acknowledged his unbroken truthfulness, yet Abu Lahab cried "May you perish! Is this why you gathered us?"—whereupon Surah Al-Masad (111) was revealed.',
      },
    ],
  },
  {
    id: 'sirah-abyssinia-boycott',
    order: 6,
    era: 'makkan_dawah',
    category: 'treaty_journey',
    yearLabel: '615 – 619 CE',
    title: 'Migration to Abyssinia & Three-Year Boycott of Shi‘b Abi Talib',
    where: 'Kingdom of Aksum (Abyssinia) & Shi‘b Abi Talib Ravine, Makkah',
    whatSummary:
      'To shield vulnerable believers from Makkan torture, the Prophet ﷺ directed companions to Abyssinia under the righteous King Najashi. Enraged Quraysh leaders enforced a complete social and trade boycott against Banu Hashim.',
    howNarrative:
      'In Abyssinia, Ja‘far ibn Abi Talib (RA) answered Quraysh envoys by reciting Surah Maryam before Najashi, moving the king to weep and guarantee Muslim safety. Back in Makkah, Banu Hashim survived three years of near-starvation in a narrow gorge until honorable Makkan elders annulled the unjust parchment.',
    revelations: [
      {
        surahNumber: 19,
        ayahNumber: 16,
        ayahRangeLabel: 'Surah Maryam 19:16–36',
        contextEnglish:
          'Recited before Najashi, presenting the pure Quranic account of Maryam (AS) and Prophet Isa (AS).',
      },
    ],
    hadiths: [
      {
        source: 'Sahih al-Bukhari 3876',
        narrator: 'Ubaydullah ibn Adiyy & Jabir (RA)',
        textEnglish:
          'When Najashi (Ashamah) passed away in Abyssinia, the Messenger of Allah ﷺ announced his death the very day in Madinah, led the funeral prayer in absentia (Salat al-Gha’ib), and prayed for his forgiveness.',
      },
    ],
  },
  {
    id: 'sirah-sorrow-taif-isra',
    order: 7,
    era: 'makkan_dawah',
    category: 'revelation',
    yearLabel: '619 – 621 CE · Year of Sorrow & Al-Isra',
    title: 'Year of Sorrow, Mercy at Ta’if & Al-Isra wal-Mi‘raj',
    where: 'Makkah, Ta’if, Al-Masjid al-Aqsa (Jerusalem) & the Seven Heavens',
    whatSummary:
      'Shortly after the boycott lifted, both Khadijah (RA) and Abu Talib passed away within weeks. Seeking shelter in Ta’if, the Prophet ﷺ was stoned until his sandals filled with blood—yet forgave them and was soon honored with the Night Journey.',
    howNarrative:
      'When Jibril and the Angel of the Mountains offered to crush Ta’if between two hills, the Prophet ﷺ declined, praying that Allah raise believers from their descendants. Thereafter, on the miraculous Night Journey, Jibril escorted him on Al-Buraq to Bayt al-Maqdis where he led all Prophets in prayer, then ascended through all seven heavens to receive the five daily prayers directly from Allah.',
    revelations: [
      {
        surahNumber: 17,
        ayahNumber: 1,
        ayahRangeLabel: 'Surah Al-Isra 17:1',
        contextEnglish:
          'Establishes the miraculous Night Journey from Al-Masjid al-Haram in Makkah to Al-Masjid al-Aqsa in Jerusalem.',
      },
      {
        surahNumber: 53,
        ayahNumber: 13,
        ayahRangeLabel: 'Surah An-Najm 53:13–18',
        contextEnglish: 'Describes his ascent beyond Sidrat al-Muntaha (Lote Tree of the Utmost Boundary).',
      },
    ],
    hadiths: [
      {
        source: 'Sahih al-Bukhari 3231',
        narrator: 'Aishah (RA)',
        textEnglish:
          'Asked whether he ever faced a day harder than Uhud, the Prophet ﷺ recounted Ta’if and how he told the Angel of the Mountains: "Rather, I hope Allah will bring forth from their loins people who will worship Allah alone without associating anything with Him."',
      },
      {
        source: 'Sahih al-Bukhari 3207 & Sahih Muslim 162',
        narrator: 'Anas ibn Malik (RA)',
        textEnglish:
          'Recounts his ascent through the seven heavens meeting Adam, Yahya & Isa, Yusuf, Idris, Harun, Musa, and Ibrahim (AS), before fifty prayers were lightened to five carrying the full reward of fifty.',
      },
    ],
  },
  {
    id: 'sirah-aqabah-hijrah',
    order: 8,
    era: 'madinan_state',
    category: 'treaty_journey',
    yearLabel: '1 AH · 622 CE (Rabi al-Awwal)',
    title: 'Pledges of Aqabah, Cave of Thawr & The Hijrah to Madinah',
    where: 'Mina (Aqabah), Cave of Thawr, Quba & Madinah al-Munawwarah',
    whatSummary:
      'After the Aws and Khazraj tribes of Yathrib pledged total loyalty and protection at Aqabah, the Prophet ﷺ escaped a multi-clan assassination plot with Abu Bakr (RA), hid three days in Cave Thawr, and arrived at Quba.',
    howNarrative:
      'Entrusting Ali (RA) to sleep in his bed and return Makkan residents’ deposits the next day, the Prophet ﷺ walked out reciting Surah Ya-Sin. Pursuers stood directly over Cave Thawr; when Abu Bakr worried they would be spotted if they looked down, the Prophet ﷺ comforted him: "What do you think of two when Allah is their third?" Upon reaching Quba, he founded Masjid Quba before entering joyful Madinah.',
    revelations: [
      {
        surahNumber: 9,
        ayahNumber: 40,
        ayahRangeLabel: 'Surah At-Tawbah 9:40',
        contextEnglish:
          'Directly honors the two companions in Cave Thawr: "Do not grieve; indeed Allah is with us."',
      },
    ],
    hadiths: [
      {
        source: 'Sahih al-Bukhari 3653',
        narrator: 'Anas from Abu Bakr al-Siddiq (RA)',
        textEnglish:
          'Abu Bakr said: "I saw the feet of the polytheists right above our heads while we were in the cave and whispered, O Messenger of Allah, if one of them looks under his feet he will see us." He replied: "Be silent, O Abu Bakr! What do you think of two when Allah is the third with them?"',
      },
      {
        source: 'Sahih al-Bukhari 3906',
        narrator: 'Al-Bara ibn Azib (RA)',
        textEnglish:
          'Recounts the miraculous pursuit by Suraqah ibn Malik whose horse sank thrice into solid desert sand as he tried to capture the Prophet ﷺ for Quraysh’s 100-camel bounty, leading Suraqah to seek a written pledge of safety.',
      },
    ],
  },
  {
    id: 'sirah-madinah-state',
    order: 9,
    era: 'madinan_state',
    category: 'milestone',
    yearLabel: '1 – 2 AH · 622 – 623 CE',
    title: 'Masjid al-Nabawi, Brotherhood (Mu’akhat) & Change of Qiblah',
    where: 'Madinah al-Munawwarah',
    whatSummary:
      'Immediately upon settling in Madinah, the Prophet ﷺ built Masjid al-Nabawi, instituted formal brotherhood pairing Muhajirin with Ansar, enacted the Constitution of Madinah, and received the revelation turning prayer toward the Ka‘bah.',
    howNarrative:
      'Carrying bricks himself alongside companions chanting verses of brotherhood, he unified warring tribes into one disciplined community governed by written civic justice. Sixteen months after Hijrah, mid-prayer, revelation redirected the Qiblah from Jerusalem permanently toward Makkah.',
    revelations: [
      {
        surahNumber: 2,
        ayahNumber: 144,
        ayahRangeLabel: 'Surah Al-Baqarah 2:144',
        contextEnglish: 'Command shifting the direction of prayer permanently to Al-Masjid al-Haram in Makkah.',
      },
    ],
    hadiths: [
      {
        source: 'Sahih al-Bukhari 3906 & 4486',
        narrator: 'Anas & Al-Bara (RA)',
        textEnglish:
          'Describes building Masjid al-Nabawi on land purchased fairly from two orphans (Sahl & Suhayl), pairing Muhajirin and Ansar such as Abd al-Rahman ibn Awf and Sa‘d ibn al-Rabi‘, and praying sixteen or seventeen months toward Jerusalem before the Qiblah turned to the Ka‘bah.',
      },
    ],
  },
  {
    id: 'sirah-battle-badr',
    order: 10,
    era: 'madinan_state',
    category: 'battle',
    yearLabel: '2 AH · 17 Ramadan (624 CE)',
    title: 'Battle of Badr — Yawm al-Furqan (Day of the Criterion)',
    where: 'Wells of Badr (~130 km southwest of Madinah)',
    whatSummary:
      'Islam’s decisive first major pitched war: 313 modestly equipped believers defeated a heavily armored 1,000-man Quraysh army—shattering Makkan arrogance and safeguarding the nascent Madinan community.',
    howNarrative:
      'Originally marching with ~313 men to intercept Abu Sufyan’s Makkan caravan carrying plundered emigrant wealth, the Prophet ﷺ learned Abu Jahl was advancing with 1,000 elite fighters. After consulting both Muhajirin and Ansar, he positioned the army at the nearest well per Al-Hubab’s strategy and prayed earnestly all night until Allah sent gentle rain and 1,000 supporting angels.',
    battleDetails: {
      cause:
        'Reclaiming confiscated wealth of Makkan emigrants carried in Abu Sufyan’s caravan and halting Quraysh’s armed intimidation of Madinah.',
      commanders:
        'Muslims: Prophet Muhammad ﷺ (field banners held by Mus‘ab ibn Umayr, Ali, and Sa‘d ibn Mu‘adh) · Quraysh: Abu Jahl ibn Hisham (commander-in-chief) & Utbah ibn Rabi‘ah.',
      forces:
        'Muslims: 313 fighters, 2 horses, 70 camels · Quraysh: ~1,000 warriors, 100 horses, 600 armored men.',
      howItUnfolded:
        'Single combat opened with Hamzah, Ali, and Ubaydah defeating Utbah, Shaybah, and al-Walid. Disciplined Muslim ranks resisted arrow volleys before launching a decisive charge led by angelic reinforcement.',
      outcomeAndLesson:
        '70 Quraysh chiefs slain (including Abu Jahl and Umayyah ibn Khalaf) and 70 captured; only 14 Muslim martyrs fell. Captives able to teach 10 Madinan children literacy earned freedom—establishing mercy and education even in war.',
    },
    revelations: [
      {
        surahNumber: 8,
        ayahNumber: 9,
        ayahRangeLabel: 'Surah Al-Anfal 8:9–12 & 8:41',
        contextEnglish:
          'Revealed specifically about Badr: recounts Allah answering the Prophet’s ﷺ prayer with 1,000 angels and naming Badr "Yawm al-Furqan."',
      },
      {
        surahNumber: 3,
        ayahNumber: 123,
        ayahRangeLabel: 'Surah Ali ‘Imran 3:123–125',
        contextEnglish: 'Reminds believers that Allah gave them victory at Badr while they were humble and outnumbered.',
      },
    ],
    hadiths: [
      {
        source: 'Sahih Muslim 1763',
        narrator: 'Umar ibn al-Khattab (RA)',
        textEnglish:
          'At Badr, the Prophet ﷺ looked at the 1,000 polytheists and his 319 companions, faced the Qiblah raising his hands so high his cloak slipped off his shoulders, and pleaded: "O Allah, fulfill Your promise to me! If this small group of Muslims perishes today, You will not be worshipped on earth."',
      },
      {
        source: 'Sahih al-Bukhari 3953 & 3992',
        narrator: 'Ibn Abbas & Rifaa al-Zuraqi (RA)',
        textEnglish:
          'Jibril came to the Prophet ﷺ and asked: "How do you regard the participants of Badr among you?" He replied: "As the best of the Muslims." Jibril said: "And likewise are the angels who took part in Badr!"',
      },
    ],
  },
  {
    id: 'sirah-banu-qaynuqa-sawiq',
    order: 11,
    era: 'madinan_state',
    category: 'battle',
    yearLabel: '2 AH · Shawwal – Dhul-Hijjah (624 CE)',
    title: 'Campaign of Banu Qaynuqa & Pursuit of Al-Sawiq',
    where: 'Madinah Market Quarter & Qarqarat al-Kudr',
    whatSummary:
      'Following Badr, the Banu Qaynuqa clan openly violated the Constitution of Madinah after mocking Muslim honor and killing a Muslim passerby; shortly thereafter, Abu Sufyan staged a brief hit-and-run raid (Al-Sawiq) near Madinah.',
    howNarrative:
      'When a Muslim woman was publicly harassed in Qaynuqa’s market and a Muslim defender killed in the melee, the clan fortified themselves and rejected peace mediation. After a 15-day bloodless siege, they surrendered and were exiled north to Adhri‘at in Syria. Months later, Abu Sufyan burned palm trees outside Madinah and fled so rapidly his raiders abandoned sacks of roasted barley meal (Sawiq) to lighten their load.',
    battleDetails: {
      cause:
        'Flagrant breach of the Constitution of Madinah (treasonable hostility & murder of a citizen); Abu Sufyan’s vowed retaliatory raid after Badr.',
      commanders: 'Muslims: Prophet Muhammad ﷺ (acting governor in Madinah: Abu Lubabah) · Opponents: Banu Qaynuqa & Abu Sufyan.',
      forces: 'Qaynuqa: ~700 armed clansmen inside fortified compounds · Sawiq raid: 200 Quraysh horsemen fleeing pursuit.',
      howItUnfolded:
        'A firm 15-night blockade of Qaynuqa’s strongholds broke their defiance without pitched street bloodshed; at Sawiq, Muslim patrols chased raiders five nights into the desert.',
      outcomeAndLesson:
        'Demonstrated swift zero-tolerance enforcement of civic treaties and security around Madinah.',
    },
    revelations: [
      {
        surahNumber: 3,
        ayahNumber: 12,
        ayahRangeLabel: 'Surah Ali ‘Imran 3:12–13',
        contextEnglish: 'Addresses those arrogant after Badr to reflect upon the decisive divine sign at Badr.',
      },
    ],
  },
  {
    id: 'sirah-battle-uhud',
    order: 12,
    era: 'madinan_state',
    category: 'battle',
    yearLabel: '3 AH · Shawwal (625 CE)',
    title: 'Battle of Uhud & Pursuit to Hamra al-Asad',
    where: 'Slopes of Mount Uhud (north of Madinah) & Hamra al-Asad',
    whatSummary:
      'Seeking vengeance for Badr, Quraysh marched 3,000 warriors to Uhud. Muslims initially routed them—until forty archers abandoned their mountain pass for spoils, allowing Khalid ibn al-Walid’s cavalry to encircle the believers.',
    howNarrative:
      'As chaos struck and a rumor spread that the Prophet ﷺ was killed, heroic companions such as Abu Dujanah, Talhah, and Nusaybah bint Ka‘b shielded him physically despite severe wounds. Seventy companions including Hamzah (RA) were martyred. Yet the very next morning, the Prophet ﷺ led wounded survivors out to Hamra al-Asad to deter Abu Sufyan from returning to attack Madinah.',
    battleDetails: {
      cause: 'Makkan retaliation for Badr funded by the saved caravan profits.',
      commanders:
        'Muslims: Prophet Muhammad ﷺ, Hamzah ibn Abd al-Muttalib, Abdullah ibn Jubayr (archers) · Quraysh: Abu Sufyan & Khalid ibn al-Walid (right wing cavalry).',
      forces: 'Muslims: 700 fighters (after hypocrite chief Abdullah ibn Ubayy deserted with 300) · Quraysh: 3,000 troops, 200 cavalry.',
      howItUnfolded:
        'Fifty archers held Jabal al-Rumah pass preventing flanking. When Muslims broke enemy lines, 40 archers left their posts against explicit orders; Khalid swept behind the ridge, pinning the Muslim center.',
      outcomeAndLesson:
        '70 companions martyred (Hamzah, Mus‘ab ibn Umayr); Quraysh failed to occupy Madinah. Cemented eternal discipline: obedience to prophetic command outweighs worldly spoils.',
    },
    revelations: [
      {
        surahNumber: 3,
        ayahNumber: 139,
        ayahRangeLabel: 'Surah Ali ‘Imran 3:139–175',
        contextEnglish:
          'Extensive Quranic debrief of Uhud: prohibits despair, diagnoses disobedience at the pass, and honors those wounded who responded the next day at Hamra al-Asad (3:172).',
      },
    ],
    hadiths: [
      {
        source: 'Sahih al-Bukhari 3039 & 4043',
        narrator: 'Al-Bara ibn Azib & Sahl ibn Sa‘d (RA)',
        textEnglish:
          'The Prophet ﷺ commanded Abdullah ibn Jubayr and the archers: "Protect our backs! Even if you see birds snatching us away, do not leave your position until I send for you." At Uhud, the Prophet’s ﷺ helmet rings cut his cheek and a molar was broken while Fatimah (RA) washed the blood and burned mat-ash to stop the bleeding.',
      },
    ],
  },
  {
    id: 'sirah-banu-nadir-riqa',
    order: 13,
    era: 'madinan_state',
    category: 'battle',
    yearLabel: '4 AH · 625 – 626 CE',
    title: 'Evacuation of Banu Nadir & Expedition of Dhat al-Riqa‘',
    where: 'Southeastern Madinah & Najd Highlands',
    whatSummary:
      'After the tragic ambushes at Al-Raji‘ and Bi’r Ma‘unah claiming 70 Quran memorizers, Banu Nadir plotted to drop a millstone upon the Prophet ﷺ from a rooftop—leading to their bloodless siege and expulsion, followed by the eastern deterrence march of Dhat al-Riqa‘.',
    howNarrative:
      'Divinely informed of Banu Nadir’s assassination plot while sitting beside their wall, the Prophet ﷺ marched out; after a brief siege, they departed with all movable goods toward Khaybar and Syria. Months later, leading 400–700 men across jagged terrain to Najd (Dhat al-Riqa‘—named for rags wrapped around bleeding feet), the Prophet ﷺ instituted Salat al-Khawf (Prayer of Fear) for the first time.',
    battleDetails: {
      cause:
        'Assassination conspiracy violating Madinah’s mutual-defense pact (Banu Nadir); Bedouin tribes of Ghatafan mobilizing to raid Madinah (Dhat al-Riqa‘).',
      forces: 'Muslims: Madinan garrison (Nadir) & 400–700 men (Dhat al-Riqa‘) · Hostile confederates in Najd.',
      howItUnfolded:
        'Banu Nadir surrendered within two weeks after hypocrite allies failed to assist them; at Dhat al-Riqa‘, rapid projection of force scattered Ghatafan before combat.',
      outcomeAndLesson:
        'Surah Al-Hashr established state revenue justice (Fay’); during Dhat al-Riqa‘, a Bedouin grabbed the Prophet’s ﷺ sword while resting under a tree demanding "Who will protect you from me?"—he answered calmly "Allah," and the sword fell from the attacker’s hand.',
    },
    revelations: [
      {
        surahNumber: 59,
        ayahNumber: 2,
        ayahRangeLabel: 'Surah Al-Hashr 59:2–10',
        contextEnglish:
          'Known by companions (Ibn Abbas) as "Surah Banu Nadir," explaining their bloodless expulsion and praising the selfless Ansar.',
      },
      {
        surahNumber: 4,
        ayahNumber: 102,
        ayahRangeLabel: 'Surah An-Nisa 4:102',
        contextEnglish: 'Legislation of the Prayer of Fear (Salat al-Khawf) first practiced at Dhat al-Riqa‘.',
      },
    ],
    hadiths: [
      {
        source: 'Sahih al-Bukhari 4136 & 4882',
        narrator: 'Jabir ibn Abdullah & Ibn Abbas (RA)',
        textEnglish:
          'At Dhat al-Riqa‘, Jabir reported six men taking turns riding one camel so their feet bled and were wrapped in rags, and how Salat al-Khawf was performed—along with the famous Bedouin incident where the Prophet ﷺ forgave the man whose sword fell upon hearing "Allah!"',
      },
    ],
  },
  {
    id: 'sirah-muraysi',
    order: 14,
    era: 'madinan_state',
    category: 'battle',
    yearLabel: '5 AH · Sha‘ban (626 CE)',
    title: 'Campaign of Al-Muraysi‘ (Banu al-Mustaliq)',
    where: 'Well of Al-Muraysi‘ near Qudayd (coastal Hijaz)',
    whatSummary:
      'Learning that Al-Harith ibn Abi Dirar was uniting Banu Mustaliq to march on Madinah, the Prophet ﷺ launched a preemptive surprise march to Al-Muraysi‘, breaking their mobilization swiftly.',
    howNarrative:
      'Catching the Mustaliq camp unprepared at their watering hole, a brief arrow exchange ended in decisive surrender. By marrying Juwayriyyah bint al-Harith (RA), the daughter of their chief, the Prophet ﷺ sparked spontaneous compassion—every companion freed all ~100 captive families because they had become in-laws of the Messenger of Allah ﷺ, bringing the entire tribe warmly into Islam.',
    battleDetails: {
      cause: 'Banu Mustaliq’s armed assembly to strike Madinah.',
      forces: 'Muslims: ~700 troops · Banu Mustaliq host under Al-Harith ibn Abi Dirar.',
      howItUnfolded:
        'Rapid advance forced immediate engagement at Al-Muraysi‘ well; brief resistance collapsed with minimal casualties.',
      outcomeAndLesson:
        'Entire tribe freed and embraced Islam through the Prophet’s ﷺ marriage to Juwayriyyah (RA); on the return march, hypocrites spread slander against Aishah (RA)—exonerated forever by Surah An-Nur (Al-Ifk).',
    },
    revelations: [
      {
        surahNumber: 24,
        ayahNumber: 11,
        ayahRangeLabel: 'Surah An-Nur 24:11–21 & Al-Munafiqun 63:1–8',
        contextEnglish:
          'Exonerates Aishah (RA) from the slander spread during this campaign and exposes the hypocrisy of Abdullah ibn Ubayy.',
      },
    ],
    hadiths: [
      {
        source: 'Sahih al-Bukhari 2541 & 4141',
        narrator: 'Ibn Umar & Aishah (RA)',
        textEnglish:
          'Describes the surprise dawn operation at Al-Muraysi‘ and the complete exoneration of Aishah (RA) after thirty days of painful trial—when Surah An-Nur’s verses descended certifying her purity forever in the Quran.',
      },
    ],
  },
  {
    id: 'sirah-khandaq-qurayzah',
    order: 15,
    era: 'madinan_state',
    category: 'battle',
    yearLabel: '5 AH · Shawwal – Dhul-Qi‘dah (627 CE)',
    title: 'War of the Trench (Al-Ahzab / Khandaq) & Banu Qurayzah',
    where: 'Northern Rim of Madinah & Fortresses of Banu Qurayzah',
    whatSummary:
      'Ten thousand confederates from Quraysh, Ghatafan, and exiled tribes besieged Madinah to wipe out Islam. Acting on Salman al-Farsi’s (RA) counsel, Muslims dug a 5.5 km trench—starving out the siege until divine winds scattered the coalition—then swiftly addressed Banu Qurayzah’s wartime betrayal.',
    howNarrative:
      'Despite freezing winds and biting hunger where companions strapped stones to their stomachs, Muslims rotated guard continuously for nearly a month. Inside Madinah, Banu Qurayzah broke their solemn mutual-defense pact and opened negotiations to strike Madinan families from behind—creating maximum peril until Nu‘aym ibn Mas‘ud fractured enemy trust and Allah sent a fierce hurricane uprooting enemy tents. Immediately afterward, Jibril instructed the Prophet ﷺ to march to Qurayzah before removing armor.',
    battleDetails: {
      cause:
        'All-out Confederate invasion to annihilate Madinah; wartime high treason by Banu Qurayzah opening the rear flank during siege.',
      commanders:
        'Muslims: Prophet Muhammad ﷺ (with Salman al-Farsi engineering, Ali ibn Abi Talib, Sa‘d ibn Mu‘adh) · Confederates: Abu Sufyan & Uyaynah ibn Hisn.',
      forces:
        'Muslims: 3,000 defenders · Confederates: 10,000 fighters (4,000 Quraysh + 6,000 Ghatafan & allies).',
      howItUnfolded:
        'Cavalry stalled helplessly before the trench; a few knights leaped a narrow pass—Ali slew feared champion Amr ibn Abd Wudd. After 27 days, icy gale winds shattered enemy morale. Following the siege, Banu Qurayzah surrendered after a 25-day blockade, electing former ally Sa‘d ibn Mu‘adh (RA) to judge them—who applied Torah wartime treason law (Deut. 20:10–14).',
      outcomeAndLesson:
        'Last offensive Quraysh ever launched against Madinah. The Prophet ﷺ proclaimed: "Now we shall march against them; they will never march against us."',
    },
    revelations: [
      {
        surahNumber: 33,
        ayahNumber: 9,
        ayahRangeLabel: 'Surah Al-Ahzab 33:9–27',
        contextEnglish:
          'Details the existential terror of the siege ("eyes grew wild and hearts reached throats"), divine wind & unseen forces, and the aftermath with Banu Qurayzah (33:26).',
      },
    ],
    hadiths: [
      {
        source: 'Sahih al-Bukhari 4101, 4110 & 4121',
        narrator: 'Jabir ibn Abdullah, Al-Bara & Aishah (RA)',
        textEnglish:
          'At Khandaq the Prophet ﷺ worked digging earth until dust covered his chest, reciting verses with the Ansar. When he later took off his armor after the coalition fled, Jibril appeared saying: "You have laid down your arms while we angels have not yet laid ours down—march against Banu Qurayzah!"',
      },
    ],
  },
  {
    id: 'sirah-hudaybiyyah',
    order: 16,
    era: 'madinan_state',
    category: 'treaty_journey',
    yearLabel: '6 AH · Dhul-Qi‘dah (628 CE)',
    title: 'Treaty of Hudaybiyyah & Bay‘at al-Ridwan (Pledge Under the Tree)',
    where: 'Al-Hudaybiyyah, border of Makkah’s Sacred Sanctuary',
    whatSummary:
      'Marching peacefully with 1,400 unarmed pilgrims in Ihram to perform Umrah, the Prophet ﷺ halted outside Makkah and negotiated a 10-year peace treaty with Quraysh—crowned by Bay‘at al-Ridwan under the acacia tree.',
    howNarrative:
      'When rumors circulated that envoy Uthman (RA) had been murdered in Makkah, 1,400 companions pledged steadfastness unto death beneath a tree—earning Allah’s eternal pleasure. Though terms appeared concessionary (returning that year, returning Makkan converts fleeing to Madinah), the truce ended active war, lifted Quraysh’s quarantine over Arab tribes, and yielded massive conversions over the next 24 months.',
    revelations: [
      {
        surahNumber: 48,
        ayahNumber: 1,
        ayahRangeLabel: 'Surah Al-Fath 48:1–29',
        contextEnglish:
          'Descended during the return from Hudaybiyyah, proclaiming the treaty a "Clear Victory" (Fathan Mubina) and sending Sakinah upon the pledgers of Bay‘at al-Ridwan.',
      },
    ],
    hadiths: [
      {
        source: 'Sahih al-Bukhari 2731–2732 & 4185',
        narrator: 'Al-Miswar ibn Makhramah & Jabir (RA)',
        textEnglish:
          'Al-Bara (RA) explained: "You consider the Conquest of Makkah to be the Victory, while we companions considered the Victory (Fath) to be Bay‘at al-Ridwan on the Day of Hudaybiyyah." And the Prophet ﷺ declared: "No one who pledged beneath the Tree shall enter the Fire."',
      },
    ],
  },
  {
    id: 'sirah-khaybar-letters',
    order: 17,
    era: 'madinan_state',
    category: 'battle',
    yearLabel: '7 AH · Muharram – Safar (628 CE)',
    title: 'Letters to Emperors & War of Khaybar (plus Fadak & Wadi al-Qura)',
    where: 'Madinah Diplomatic Envoys & Khaybar Oasis (~150 km north)',
    whatSummary:
      'Free from Quraysh’s southern front via Hudaybiyyah, the Prophet ﷺ dispatched ambassadors bearing his silver seal to Heraclius, Chosroes, Muqawqis, and Najashi—then dismantled the northern coalition stronghold of Khaybar.',
    howNarrative:
      'Because exiled Banu Nadir chiefs at Khaybar had financed the Confederate siege and continued rallying Ghatafan, the Prophet ﷺ led the 1,400 veterans of Hudaybiyyah north. Over several weeks, eight fortified citadels fell systematically—culminating in Ali ibn Abi Talib (RA) storming Al-Qamus after being miraculously healed from severe eye inflammation.',
    battleDetails: {
      cause:
        'Disarming the heavily fortified northern coalition hub orchestrating Ghatafan and confederate invasions against Madinah.',
      commanders:
        'Muslims: Prophet Muhammad ﷺ, Abu Bakr, Umar, and Ali ibn Abi Talib (RA) · Defenders: Sallam ibn Mishkam, Kinanah, and warrior champion Marhab.',
      forces: 'Muslims: 1,400–1,600 veterans of Hudaybiyyah · Defenders: 10,000+ fighters inside walled stone fortresses.',
      howItUnfolded:
        'Fortresses Na‘im, Al-Sa‘b, and Zubayr fell sequentially. After fierce resistance at Al-Qamus, Ali (RA) defeated Marhab in single combat and opened the citadel.',
      outcomeAndLesson:
        'Permanent security of northern Hijaz; Fadak and Tayma surrendered peacefully, and farmers kept working Khaybar’s orchards for 50% crop share.',
    },
    revelations: [
      {
        surahNumber: 48,
        ayahNumber: 20,
        ayahRangeLabel: 'Surah Al-Fath 48:18–20',
        contextEnglish: 'Foretold the imminent abundant gains reserved specifically for the pledgers of Hudaybiyyah—fulfilled at Khaybar.',
      },
    ],
    hadiths: [
      {
        source: 'Sahih al-Bukhari 2947, 3009 & 4210',
        narrator: 'Sahl ibn Sa‘d & Anas (RA)',
        textEnglish:
          'Outside Khaybar’s toughest fortress, the Prophet ﷺ declared: "Tomorrow I will hand the banner to a man who loves Allah and His Messenger and whom Allah and His Messenger love; Allah will grant victory at his hands." All companions hoped for it; the next morning he summoned Ali (RA), cured his painful eyes with his blessed saliva, and sent him forth with the command: "Advance steadily and invite them to Islam before fighting, for if Allah guides even one man through you, it is better for you than red camels."',
      },
    ],
  },
  {
    id: 'sirah-mutah',
    order: 18,
    era: 'madinan_state',
    category: 'battle',
    yearLabel: '8 AH · Jumada al-Ula (629 CE)',
    title: 'Battle of Mu’tah — 3,000 Against an Imperial Host',
    where: 'Mu’tah, Karak Governorate (southern Jordan)',
    whatSummary:
      'Sent to seek accountability after Muslim ambassador al-Harith ibn Umayr was executed by a Ghassanid ruler, 3,000 Muslims stood courageously against a combined Byzantine–Ghassanid imperial army reported at 100,000+ troops.',
    howNarrative:
      'Honoring the Prophet’s ﷺ pre-appointed chain of command, Zayd ibn Harithah, Ja‘far ibn Abi Talib, and Abdullah ibn Rawahah (RA) each bore the standard forward until martyrdom—Ja‘far holding the banner with severed limbs until struck down with 90+ frontal wounds. Khalid ibn al-Walid (RA) then assumed command, reshuffled vanguard and rear divisions overnight to create the illusion of massive fresh reinforcements, and extricated the entire army safely.',
    battleDetails: {
      cause:
        'Execution of diplomatic envoy al-Harith ibn Umayr al-Azdi (RA) by Shurahbil ibn Amr al-Ghassani while carrying the Prophet’s ﷺ letter to Busra.',
      commanders:
        'Muslims: Zayd ibn Harithah → Ja‘far ibn Abi Talib → Abdullah ibn Rawahah → Khalid ibn al-Walid (RA) · Coalition: Theodore & Shurahbil under Emperor Heraclius.',
      forces: 'Muslims: 3,000 fighters · Byzantine + Arab Christian Confederates: ~100,000+ troops.',
      howItUnfolded:
        'Six days of intense fighting against overwhelming numbers; after three commanders fell bravely, Khalid broke nine swords holding the center, reorganized formations over nightfall, and conducted a textbook strategic withdrawal without enemy pursuit.',
      outcomeAndLesson:
        'Only 12 recorded Muslim martyrs fell against imperial legions; Khalid received the honorific "Sayfullah" (Sword of Allah), shattering the myth of Byzantine invincibility.',
    },
    revelations: [],
    hadiths: [
      {
        source: 'Sahih al-Bukhari 4262 & 3757',
        narrator: 'Anas ibn Malik & Ibn Umar (RA)',
        textEnglish:
          'In Madinah, before messengers arrived from Jordan, the Prophet ﷺ described the battle live with eyes overflowing: "Zayd took the banner and was martyred; then Ja‘far took it and was martyred; then Ibn Rawahah took it and was martyred—until a Sword among the Swords of Allah took the flag and Allah opened relief for them." Ibn Umar testified we counted 50+ wounds on Ja‘far’s front alone, none on his back.',
      },
    ],
  },
  {
    id: 'sirah-fath-makkah',
    order: 19,
    era: 'final_years',
    category: 'battle',
    yearLabel: '8 AH · 20 Ramadan (630 CE)',
    title: 'Bloodless Conquest of Makkah (Fath Makkah)',
    where: 'Makkah al-Mukarramah & Al-Masjid al-Haram',
    whatSummary:
      'When Quraysh violated the Hudaybiyyah truce by arming a night massacre against Banu Khuza‘ah, the Prophet ﷺ marched silently with 10,000 troops, shocked Makkah into peaceful surrender, purged the Ka‘bah of 360 idols, and granted historic general amnesty.',
    howNarrative:
      'Secret mobilization culminated in lighting 10,000 campfires on the hills of Marr al-Zahran. Abu Sufyan accepted Islam that night after witnessing the disciplined host. Four columns entered Makkah simultaneously under strict orders against shedding blood unless attacked. Riding in utmost humility with chin bowed to his saddle, the Prophet ﷺ circled the Ka‘bah dismantling every idol and pardoned the very leaders who had persecuted him for 21 years.',
    battleDetails: {
      cause:
        'Quraysh treachery supporting Banu Bakr’s surprise massacre of Muslim-allied Banu Khuza‘ah inside the Sacred Sanctuary.',
      commanders:
        'Muslims: Prophet Muhammad ﷺ (column leaders Khalid ibn al-Walid, Zubayr ibn al-Awwam, Abu Ubaydah, Qays ibn Sa‘d) · Quraysh: surrendered city.',
      forces: 'Muslims: 10,000 believers · Only one minor resistance pocket met Khalid’s southern column (~12 hostile casualties).',
      howItUnfolded:
        'Total strategic surprise rendered defense futile; Bilal (RA) climbed atop the Ka‘bah to proclaim the Adhan across Makkah.',
      outcomeAndLesson:
        'Ultimate triumph of forgiveness over vengeance: "Go, for you are the freed ones (Antum at-Tulaqa)." Virtually the entire population of Makkah entered Islam willingly.',
    },
    revelations: [
      {
        surahNumber: 17,
        ayahNumber: 81,
        ayahRangeLabel: 'Surah Al-Isra 17:81',
        contextEnglish:
          'Recited aloud by the Prophet ﷺ as he struck each of the 360 idols around the Ka‘bah with his staff and they toppled.',
      },
      {
        surahNumber: 110,
        ayahNumber: 1,
        ayahRangeLabel: 'Surah An-Nasr 110:1–3',
        contextEnglish: 'Celebrates the Conquest of Makkah and mass conversions while hinting at the nearness of his passing.',
      },
    ],
    hadiths: [
      {
        source: 'Sahih al-Bukhari 4287 & 4289',
        narrator: 'Abdullah ibn Mas‘ud & Abu Hurayrah (RA)',
        textEnglish:
          'When the Prophet ﷺ entered Makkah, 360 idols stood around the Ka‘bah. He struck them with his stick saying: "Truth has come and falsehood has vanished," and prayed inside the Ka‘bah after cleansing it completely.',
      },
    ],
  },
  {
    id: 'sirah-hunayn-taif',
    order: 20,
    era: 'final_years',
    category: 'battle',
    yearLabel: '8 AH · Shawwal – Dhul-Qi‘dah (630 CE)',
    title: 'Battle of Hunayn & Siege of Ta’if',
    where: 'Hunayn Valley & Fortress of Ta’if',
    whatSummary:
      'Confident in their 12,000-man army—the largest yet—Muslim forces walked into a dawn canyon ambush by Hawazin and Thaqif archers. Only pure steadfastness by the Prophet ﷺ turned a near-rout into decisive victory, followed by the siege of Ta’if.',
    howNarrative:
      'As thousands scattered in the narrow canyon gorge under arrow rain, the Prophet ﷺ spurred his white mule directly forward toward enemy ranks with barely a dozen companions beside him, having Al-Abbas (RA) boom across the cliffs for the Ansar and People of the Tree. Believers rallied immediately, crushed the ambush, pursued survivors to Awtaas and Ta’if, and later moved Hawazin to embrace Islam wholeheartedly through magnanimous reconciliation.',
    battleDetails: {
      cause: 'Preemptive mobilization by Hawazin & Thaqif confederates under Malik ibn Awf to attack Makkah immediately after its conquest.',
      commanders: 'Muslims: Prophet Muhammad ﷺ & Khalid ibn al-Walid (vanguard) · Confederates: Malik ibn Awf al-Nasri.',
      forces: 'Muslims: 12,000 (10,000 Madinans + 2,000 newly Muslim Makkans) · Confederates: ~20,000 Hawazin & Thaqif.',
      howItUnfolded:
        'Morning valley ambush caused panic until Al-Abbas’s call rallied believers around the unyielding Prophet ﷺ; counterattack routed Hawazin completely, followed by a 20-day catapult siege at Ta’if.',
      outcomeAndLesson:
        'Victory belongs to Allah alone, never numerical superiority; returning all 6,000 Hawazin captives spontaneously catalyzed Hawazin’s & Thaqif’s eventual conversion.',
    },
    revelations: [
      {
        surahNumber: 9,
        ayahNumber: 25,
        ayahRangeLabel: 'Surah At-Tawbah 9:25–26',
        contextEnglish:
          'Directly cites the Battle of Hunayn: "When your great numbers pleased you, but they availed you nothing... then Allah sent down His tranquility upon His Messenger and the believers."',
      },
    ],
    hadiths: [
      {
        source: 'Sahih Muslim 1775 & Sahih al-Bukhari 4316',
        narrator: 'Al-Bara ibn Azib & Abbas ibn Abd al-Muttalib (RA)',
        textEnglish:
          'Al-Bara testified: "By Allah, we fled at Hunayn while the Messenger of Allah ﷺ never turned back—he rode forward toward the enemy declaring, ‘I am the Prophet, no lie; I am the son of Abd al-Muttalib!’" Even Khalid ibn al-Walid was severely wounded that day before the tide reversed.',
      },
    ],
  },
  {
    id: 'sirah-tabuk-expedition',
    order: 21,
    era: 'final_years',
    category: 'battle',
    yearLabel: '9 AH · Rajab – Ramadan (630 CE)',
    title: 'Expedition of Tabuk (Ghazwat al-Usrah — Campaign of Hardship)',
    where: 'Tabuk Oasis (northern Arabian frontier toward Syria)',
    whatSummary:
      'Amid scorching summer heat, drought, and ripe harvest season, the Prophet ﷺ mobilized 30,000 companions northward to confront a reported Byzantine imperial mobilization.',
    howNarrative:
      'Known as the Army of Hardship, companions sacrificed everything—Abu Bakr brought all his household wealth, Umar brought half, and Uthman outfitted 300 camels plus 1,000 gold dinars. Marching 700 km to Tabuk, the Muslims camped 20 days while Byzantine forces declined engagement and withdrew; border principalities (Aylah, Jarba, Dumat al-Jandal) signed peaceful protection treaties.',
    battleDetails: {
      cause: 'Intelligence reports of Emperor Heraclius massing Byzantine and Arab auxiliary forces in southern Syria to invade Arabia.',
      commanders: 'Muslims: Prophet Muhammad ﷺ (leaving Ali RA in charge of family in Madinah) · Opponents: Imperial garrisons withdrew prior to clash.',
      forces: 'Muslims: 30,000 men, 10,000 horses—the largest army commanded in person by the Prophet ﷺ.',
      howItUnfolded:
        'Overcoming severe heat, scarce water, and hypocrite sabotage, the army arrived intact at Tabuk; diplomatic treaties secured the entire northern trade and border corridor without combat.',
      outcomeAndLesson:
        'Tested and purified true believers (notably Ka‘b ibn Malik and his two companions’ sincere 50-day repentance); sparked the 9 AH "Year of Delegations" across all Arabia.',
    },
    revelations: [
      {
        surahNumber: 9,
        ayahNumber: 117,
        ayahRangeLabel: 'Surah At-Tawbah 9:117–118',
        contextEnglish:
          'Commends the Prophet ﷺ, Muhajirin, and Ansar who stood firm in the "Hour of Hardship" (Tabuk) and accepts the famous repentance of Ka‘b ibn Malik, Murarah, and Hilal.',
      },
    ],
    hadiths: [
      {
        source: 'Sahih al-Bukhari 4416 & 4418',
        narrator: 'Sa‘d ibn Abi Waqqas & Ka‘b ibn Malik (RA)',
        textEnglish:
          'Before departing for Tabuk, the Prophet ﷺ comforted Ali (RA) who remained to guard Madinah: "Are you not pleased to be to me like Harun was to Musa, except there is no prophet after me?" And Ka‘b ibn Malik’s gripping narration records his truthfulness when failing to join Tabuk until Allah revealed his pardon.',
      },
    ],
  },
  {
    id: 'sirah-farewell-hajj',
    order: 22,
    era: 'final_years',
    category: 'revelation',
    yearLabel: '10 AH · 9 Dhul-Hijjah (632 CE)',
    title: 'Farewell Pilgrimage (Hajjat al-Wada‘) & Sermon at Arafat',
    where: 'Plains of Arafat, Muzdalifah & Mina, Makkah',
    whatSummary:
      'Leading over 100,000 companions during his sole complete Hajj after Hijrah, the Prophet ﷺ proclaimed humanity’s universal charter: sanctity of blood and property, abolition of usury and blood feuds, rights of women, and absolute equality regardless of race.',
    howNarrative:
      'On the Plain of Arafat, Surah Al-Ma’idah 5:3 descended confirming the religion’s completion. Turning to the silent multitude atop his camel Qaswa, he asked whether he had fulfilled his trust. Over a hundred thousand voices answered "We bear witness you have conveyed, fulfilled, and counseled!" Raising his forefinger skyward, he repeated thrice: "O Allah, bear witness!"',
    revelations: [
      {
        surahNumber: 5,
        ayahNumber: 3,
        ayahRangeLabel: 'Surah Al-Ma’idah 5:3',
        contextEnglish:
          'Revealed on Friday afternoon at Arafat: "Today I have perfected for you your religion and completed My favor upon you and approved Islam for you as religion."',
      },
    ],
    hadiths: [
      {
        source: 'Sahih Muslim 1218 & Sahih al-Bukhari 1739',
        narrator: 'Jabir ibn Abdullah & Abu Bakrah (RA)',
        textEnglish:
          'In his Arafat sermon he declared: "Verily your blood, your property, and your honor are sacred to you like the sanctity of this day of yours, in this month of yours, in this city of yours. Fear Allah concerning women, for you have taken them as a trust from Allah... I have left among you that which if you hold fast to it, you will never go astray: the Book of Allah!"',
      },
    ],
  },
  {
    id: 'sirah-passing',
    order: 23,
    era: 'final_years',
    category: 'milestone',
    yearLabel: '11 AH · 12 Rabi al-Awwal (632 CE · Age 63)',
    title: 'Final Counsel & Passing of Prophet Muhammad ﷺ',
    where: 'Chamber of Aishah (RA), adjacent to Masjid al-Nabawi, Madinah',
    whatSummary:
      'In his final days despite burning fever, he forbade turning graves into places of worship, freed his last remaining coins in charity, appointed Abu Bakr (RA) to lead prayer, and passed peacefully leaning against Aishah (RA).',
    howNarrative:
      'At dawn on Monday, he lifted his room’s curtain and beamed radiant joy seeing the community praying in united rows behind Abu Bakr (RA). Later that morning, choosing between remaining forever in this world or returning to Allah, he whispered while gazing skyward: "Rather, with the Highest Companion!"—leaving behind a transformed world and the complete Quran and Sunnah.',
    revelations: [
      {
        surahNumber: 3,
        ayahNumber: 144,
        ayahRangeLabel: 'Surah Ali ‘Imran 3:144',
        contextEnglish:
          'Recited by Abu Bakr (RA) to steady grief-stricken companions: "Muhammad is not but a messenger; messengers have passed before him."',
      },
    ],
    hadiths: [
      {
        source: 'Sahih al-Bukhari 4449, 4454 & 4463',
        narrator: 'Aishah & Anas ibn Malik (RA)',
        textEnglish:
          'Aishah (RA) narrated: With his blessed head resting between my chest and collarbone, he dipped his hand in a vessel of water, wiped his face saying "La ilaha illallah; indeed death has its throes," used a miswak offered by Abd al-Rahman, and looked upward saying "O Allah, [join me with] the Highest Companion!" before his hand fell softly.',
      },
    ],
  },
];

export const PROPHETS_CHRONOLOGY: ProphetEntry[] = [
  {
    id: 'prophet-1-adam',
    order: 1,
    nameEnglish: 'Adam (AS)',
    title: 'Abu al-Bashar · First Human Being & First Prophet',
    lineageAndBirth: 'Created directly by Allah’s Hands from clay gathered across the whole earth (Sahih Muslim / Abu Dawud)',
    eraAndLocation: 'Dawn of Humanity · Paradise (Al-Jannah) & Earth',
    peopleAndRegion: 'First human family and early progeny',
    missionSpanOrAge: 'Decreed lifespan of 1,000 years (of which he gifted 40 to Prophet Dawud AS per Tirmidhi 3076 Sahih; ~930–960 earthly years)',
    scriptureOrMiracle: 'Taught the names of all things; honored by the prostration of angels; direct speech with Allah',
    passingAndBurialTradition: 'Angels washed, shrouded, and prayed over him upon his passing to teach his children burial rites.',
    physicalAppearance: 'Height of sixty cubits (~90 feet), luminous perfected human form; believers entering Paradise will be restored to Adam’s exact sixty-cubit stature (Sahih al-Bukhari 3326).',
    keyTrials: 'Envy and deception of Iblis, test of the forbidden tree, grief over the murder of Habil by Qabil.',
    hadithExclusiveFacts: [
      {
        title: 'First Sneeze & Words ("Alhamdulillah")',
        topicTag: 'Beyond Quran · Creation',
        detail:
          'When Allah breathed the soul into Adam and it reached his head, Adam sneezed. The angels prompted him to say "Alhamdulillah," and upon praising Allah his Lord responded: "YarhamukAllah (May your Lord have mercy upon you)!"—establishing the Sunnah of responding to a sneeze.',
        source: 'Jami‘ at-Tirmidhi 3368 & Sahih Ibn Hibban 6165 (Sahih)',
        narrator: 'Abu Hurayrah (RA)',
      },
      {
        title: 'Iblis Circling Adam’s Hollow Clay Body',
        topicTag: 'Beyond Quran · Unseen',
        detail:
          'Before life was breathed into Adam’s dried clay form, Iblis kept circling and inspecting it. Seeing that Adam’s abdomen was hollow (ajwaf), Iblis recognized a creation that would experience hunger and desires, saying he would seek to overpower him.',
        source: 'Sahih Muslim 2611',
        narrator: 'Anas ibn Malik (RA)',
      },
      {
        title: 'Gifting 40 Years of His Life to Dawud (AS)',
        topicTag: 'Beyond Quran · Covenant',
        detail:
          'Shown the luminous souls of his descendants, Adam admired one radiant prophet—Dawud (AS)—and learned his allotted span was 60 years. Adam asked Allah to transfer 40 years from his own 1,000-year lifespan so Dawud’s life became 100.',
        source: 'Jami‘ at-Tirmidhi 3076 & Al-Mustadrak (Sahih)',
        narrator: 'Abu Hurayrah (RA)',
      },
      {
        title: 'Humble Refusal at the Grand Intercession',
        topicTag: 'Judgment Day',
        detail:
          'At the Gathering on Judgment Day, humanity runs first to Adam recalling how Allah fashioned him with His Own Hands and made angels bow. Humble in awe of his past slip, Adam says "Myself, myself!" and directs mankind onward to Nuh (AS).',
        source: 'Sahih al-Bukhari 4712 & Sahih Muslim 194',
        narrator: 'Abu Hurayrah (RA)',
      },
    ],
    lifeStages: [
      {
        stageNumber: 1,
        phaseTitle: '1. Creation from Clay & Teaching of All Names',
        where: 'Heavenly Realm',
        whatHappened:
          'Allah shaped Adam (AS) from clay with His own Hands, breathed spirit into him, stood him sixty cubits tall, taught him the names of all creation, and commanded the angels to greet and honor him.',
        howItUnfolded:
          'Allah instructed Adam to greet a group of seated angels with "As-Salamu alaykum," and they replied "Wa alaykumus-Salam wa rahmatullah," establishing the eternal greeting of Paradise.',
        revelation: {
          surahNumber: 2,
          ayahNumber: 30,
          ayahRangeLabel: 'Surah Al-Baqarah 2:30–34',
          contextEnglish: 'Appointment of Adam as Khalifah (steward) and prostration of all angels except arrogant Iblis.',
        },
        sahihHadith: {
          source: 'Sahih al-Bukhari 3326 & 6227',
          narrator: 'Abu Hurayrah (RA)',
          textEnglish:
            'The Prophet ﷺ said: "Allah created Adam in his form, sixty cubits tall. When He created him He said: Go and greet that group of angels sitting there and listen to how they greet you, for that will be your greeting and the greeting of your descendants." Every person entering Paradise will enter in Adam’s sixty-cubit form.',
        },
      },
      {
        stageNumber: 2,
        phaseTitle: '2. Creation of Hawwa (Eve), Forbidden Tree & Sincere Repentance',
        where: 'Paradise (Al-Jannah) → Descent to Earth',
        whatHappened:
          'Created Hawwa (AS) as his tranquil partner; placed in Paradise with total freedom except one tree. When Iblis swore falsely that the tree granted immortality, both slipped—yet repented immediately instead of making excuses.',
        howItUnfolded:
          'Allah taught Adam the words of repentance ("Our Lord, we have wronged ourselves..."). Forgiving him completely, Allah appointed Friday as the blessed day of his creation, entry, and descent as earthly steward.',
        revelation: {
          surahNumber: 7,
          ayahNumber: 22,
          ayahRangeLabel: 'Surah Al-A‘raf 7:22–25 & Al-Baqarah 2:37',
          contextEnglish: 'Adam and Hawwa’s remorse, words of Tawbah received from their Lord, and earthly mission.',
        },
        sahihHadith: {
          source: 'Sahih Muslim 854',
          narrator: 'Abu Hurayrah (RA)',
          textEnglish:
            'The Prophet ﷺ said: "The best day on which the sun has risen is Friday: on it Adam was created, on it he was admitted into Paradise, and on it he was expelled from it [to begin life on earth], and the Last Hour will not occur except on Friday."',
        },
      },
      {
        stageNumber: 3,
        phaseTitle: '3. Covenant of Descendants & Debate with Musa (AS)',
        where: 'Earthly Ministry & Barzakh',
        whatHappened:
          'Allah drew forth Adam’s progeny to testify to Tawhid (Alastu bi-Rabbikum). On earth, Adam witnessed all prophets—including gifting 40 years of his life to luminous Dawud (AS)—and guided his children through Habil’s tragic martyrdom.',
        howItUnfolded:
          'Millennia later, in the unseen realm, Musa (AS) reproached Adam for getting mankind out of Paradise, yet Adam won the debate by reminding Musa that the earthly mission had already been decreed forty years before Adam was even created.',
        sahihHadith: {
          source: 'Sahih al-Bukhari 3409 & 6614',
          narrator: 'Abu Hurayrah (RA)',
          textEnglish:
            'The Prophet ﷺ narrated: "Adam and Musa argued before their Lord, and Adam defeated Musa in argument!" Adam answered Musa: "You are Musa whom Allah chose with His messages and direct speech; yet you blame me for a matter Allah decreed upon me before creating me by forty years?"',
        },
      },
      {
        stageNumber: 4,
        phaseTitle: '4. Passing & Place in the First Heaven',
        where: 'Earth → First Heaven (observed during Al-Isra wal-Mi‘raj)',
        whatHappened:
          'Prophet Muhammad ﷺ met Adam (AS) in the nearest heaven weeping softly at his left (where disobedient souls pass) and smiling joyfully at his right (where righteous descendants enter).',
        howItUnfolded:
          'On the Day of Judgment, humanity first approaches Adam seeking intercession, yet in humility Adam recalls his slip and directs them onward toward Nuh (AS).',
        sahihHadith: {
          source: 'Sahih al-Bukhari 349 & 4712',
          narrator: 'Abu Dharr & Abu Hurayrah (RA)',
          textEnglish:
            'During Al-Isra, the Prophet ﷺ saw Adam seated in the First Heaven with multitudes to his right and left: looking right he laughed in joy, looking left he wept. Jibril explained: "These are the souls of his descendants—the people of Paradise to his right and of Hell to his left."',
        },
      },
    ],
    revelations: [
      {
        surahNumber: 2,
        ayahNumber: 30,
        ayahRangeLabel: 'Surah Al-Baqarah 2:30–37',
        contextEnglish: 'Full foundational narrative of Adam’s creation, angelic honor, test, and accepted repentance.',
      },
    ],
    sahihHadiths: [
      {
        source: 'Sahih al-Bukhari 3326',
        narrator: 'Abu Hurayrah (RA)',
        textEnglish: 'Creation of Adam sixty cubits tall and the greeting of As-Salamu alaykum with the angels.',
      },
      {
        source: 'Sahih al-Bukhari 3409',
        narrator: 'Abu Hurayrah (RA)',
        textEnglish: 'Famous debate between Adam and Musa (AS) before Allah concerning predestination and human responsibility.',
      },
    ],
  },
  {
    id: 'prophet-2-idris',
    order: 2,
    nameEnglish: 'Idris (AS)',
    title: 'As-Siddiq · Prophet of Truth & Elevated Station',
    lineageAndBirth: 'Early righteous prophet descended from Shith (Seth), son of Adam (AS)',
    eraAndLocation: 'Early Antediluvian Era',
    peopleAndRegion: 'Early generations descending from Adam (AS)',
    missionSpanOrAge: 'Raised to an exalted high station (Fourth Heaven per Sahih al-Bukhari)',
    scriptureOrMiracle: 'Elevated directly by Allah to a "Makan Aliyy" (Exalted Place)',
    passingAndBurialTradition: 'Allah elevated him to an honored lofty status (Quran 19:57; stationed in the Fourth Heaven in Sahih al-Bukhari 3207).',
    physicalAppearance: 'Exalted luminous appearance greeting Muhammad ﷺ warmly as "righteous brother and righteous Prophet" in the Fourth Heaven.',
    keyTrials: 'Calling early human settlements back from negligence toward steadfast truthfulness.',
    hadithExclusiveFacts: [
      {
        title: 'Confirmed Residence in the Fourth Heaven',
        topicTag: 'Beyond Quran · Mi‘raj',
        detail:
          'While Q 19:57 simply mentions Allah elevated Idris to a "High Place (Makan Aliyy)," Sahih Hadith specifies that Prophet Muhammad ﷺ met him personally stationed in the Fourth Heaven during Al-Isra wal-Mi‘raj.',
        source: 'Sahih al-Bukhari 3207 & Sahih Muslim 162',
        narrator: 'Malik ibn Sa‘sa‘ah & Anas (RA)',
      },
    ],
    lifeStages: [
      {
        stageNumber: 1,
        phaseTitle: '1. Truthful Prophetic Character & Teaching',
        where: 'Early Antediluvian Settlements',
        whatHappened:
          'Allah explicitly honors Idris (AS) in two Surahs as a "Siddiq" (exceedingly truthful), patient, righteous messenger admitted into Allah’s special mercy.',
        howItUnfolded:
          'Unlike unverified legends, the Quran and Sahih Sunnah restrict attention to his supreme integrity, patience under opposition, and lofty spiritual rank.',
        revelation: {
          surahNumber: 19,
          ayahNumber: 56,
          ayahRangeLabel: 'Surah Maryam 19:56–57 & Al-Anbiya 21:85',
          contextEnglish: 'Affirms Idris was a Prophet of Truth whom Allah raised to a high station.',
        },
      },
      {
        stageNumber: 2,
        phaseTitle: '2. Meeting in the Fourth Heaven During Al-Isra wal-Mi‘raj',
        where: 'Fourth Heaven (confirmed in Sahih Hadith)',
        whatHappened:
          'During his nocturnal ascent, Prophet Muhammad ﷺ was greeted warmly by Idris (AS) in the Fourth Heaven—confirming the Quranic meaning of "We raised him to a high station."',
        howItUnfolded:
          'Jibril introduced him, and Idris (AS) welcomed the Final Messenger saying: "Welcome to the righteous brother and righteous prophet!"',
        sahihHadith: {
          source: 'Sahih al-Bukhari 3207 & Sahih Muslim 162',
          narrator: 'Anas ibn Malik & Malik ibn Sa‘sa‘ah (RA)',
          textEnglish:
            'The Prophet ﷺ narrated: "Then Jibril ascended with me to the Fourth Heaven and asked for it to open. It was asked, ‘Who is this?’ He said, ‘Jibril.’ ... There I saw Idris! He welcomed me and invoked blessings upon me saying: Welcome to the pious brother and pious Prophet!"',
        },
      },
    ],
    revelations: [
      {
        surahNumber: 19,
        ayahNumber: 56,
        ayahRangeLabel: 'Surah Maryam 19:56–57',
        contextEnglish: 'Explicit Quranic testimony to Idris’s truthfulness and elevation.',
      },
    ],
    sahihHadiths: [
      {
        source: 'Sahih al-Bukhari 3207',
        narrator: 'Malik ibn Sa‘sa‘ah (RA)',
        textEnglish: 'Meeting Idris (AS) stationed in the Fourth Heaven during Al-Isra wal-Mi‘raj.',
      },
    ],
  },
  {
    id: 'prophet-3-nuh',
    order: 3,
    nameEnglish: 'Nuh (AS)',
    title: 'Shaykh al-Mursalin · First Messenger Sent to Idolaters',
    lineageAndBirth: 'Descendant of Idris/Shith; sent ten generations after Adam (Sahih Ibn Hibban / Ibn Abbas)',
    eraAndLocation: 'Ancient Mesopotamia (landed on Mount Judi)',
    peopleAndRegion: 'First community to fall into shirk via five righteous elders (Wadd, Suwa‘, Yaghuth, Ya‘uq, Nasr)',
    missionSpanOrAge: '950 years of preaching before the Flood (Quran 29:14)',
    scriptureOrMiracle: 'Constructing the Great Ark (Al-Fulk) and surviving the Universal Flood',
    passingAndBurialTradition: 'Passed after leaving his unforgettable monotheistic final testament to his son.',
    physicalAppearance: 'Elder patriarch among the Messengers; greeted Muhammad ﷺ in the Second/lower prophetic assemblies of the Mi‘raj (recorded warmly welcoming him as "righteous brother").',
    keyTrials: '950 years of mockery; rejection by his own wife and one son who drowned in denial.',
    hadithExclusiveFacts: [
      {
        title: 'Ten Generations of Pure Islam Before Any Idolatry Existed',
        topicTag: 'Beyond Quran · History',
        detail:
          'Ibn Abbas (RA) narrated authentically that for ten full centuries between Adam and Nuh, all people upon earth followed a single religion of pure Tawhid—shirk began only after venerating statues carved to remember five righteous elders: Wadd, Suwa‘, Yaghuth, Ya‘uq, and Nasr.',
        source: 'Sahih al-Bukhari 4920 & Sahih Ibn Hibban (Ibn Abbas)',
        narrator: 'Abdullah ibn Abbas (RA)',
      },
      {
        title: 'Deathbed Testament of Two Commands & Two Prohibitions',
        topicTag: 'Beyond Quran · Final Will',
        detail:
          'Not recorded in the Quran: on his deathbed Nuh commanded his son with La ilaha illallah (which outweighs all seven heavens and earths on the Scale) and SubhanAllahi wa bihamdihi (the prayer sustaining all creation), and strictly forbade shirk and pride (kibr).',
        source: 'Musnad Ahmad 6583 & Al-Adab al-Mufrad 548 (Sahih)',
        narrator: 'Abdullah ibn Amr (RA)',
      },
      {
        title: 'Calling Muhammad’s ﷺ Ummah as His Witness on Judgment Day',
        topicTag: 'Beyond Quran · Judgment Day',
        detail:
          'Allah asks Nuh on Judgment Day if he conveyed His message; Nuh says yes, yet his people deny ever receiving a warner! Allah asks who testifies for Nuh, and Nuh responds: "Muhammad and his Ummah"—who step forward testifying based on revelation that Nuh fulfilled his trust completely.',
        source: 'Sahih al-Bukhari 4487 & 7349',
        narrator: 'Abu Sa‘id al-Khudri (RA)',
      },
    ],
    lifeStages: [
      {
        stageNumber: 1,
        phaseTitle: '1. Origins of Idolatry & First Messenger Sent to Earth',
        where: 'Ancient Mesopotamia',
        whatHappened:
          'As Ibn Abbas (RA) explained in Sahih al-Bukhari, people once revered five pious scholars (Wadd, Suwa‘, etc.); generations later Shaytan persuaded descendants to carve statues in their memory—which subsequent generations began worshipping.',
        howItUnfolded:
          'Allah appointed Nuh (AS) as the very first Rasul (Messenger sent to an idolatrous people), calling day and night, secretly and openly, for 950 unbroken years.',
        revelation: {
          surahNumber: 71,
          ayahNumber: 1,
          ayahRangeLabel: 'Surah Nuh 71:1–24 & Al-‘Ankabut 29:14',
          contextEnglish: 'Chronicles how Nuh called his people 950 years through every rational and spiritual argument.',
        },
        sahihHadith: {
          source: 'Sahih al-Bukhari 4920 & 4712',
          narrator: 'Ibn Abbas & Abu Hurayrah (RA)',
          textEnglish:
            'Ibn Abbas explained the idols named in Surah Nuh (71:23) were originally pious men whose statues later became objects of worship. And in Sahih al-Bukhari 4712, humanity tells Nuh on Judgment Day: "O Nuh, you are the first Messenger Allah sent to the people of the earth, and Allah named you a grateful servant (Abdan Shakura)."',
        },
      },
      {
        stageNumber: 2,
        phaseTitle: '2. Warning Against Dajjal & Building the Ark Under Mockery',
        where: 'Dry Inland Plains → Mount Judi',
        whatHappened:
          'Allah revealed no further people would believe beyond the small band already with him, commanding Nuh (AS) to build the Ark "under Our Eyes." Even while passersby ridiculed him on dry land, he continued steadfastly—and like every prophet, warned his people against the Dajjal.',
        howItUnfolded:
          'When the oven gushed water as the appointed sign, Nuh loaded two of every animal pair and the believing poor—excluding his unbelieving wife and defiant son—and rode mountainous waves safely to Mount Judi.',
        revelation: {
          surahNumber: 11,
          ayahNumber: 36,
          ayahRangeLabel: 'Surah Hud 11:36–48',
          contextEnglish: 'Constructing the Ark, departure of the believers, tragic refusal of his son, and coming to rest on Mount Judi.',
        },
        sahihHadith: {
          source: 'Sahih al-Bukhari 3337',
          narrator: 'Ibn Umar (RA)',
          textEnglish:
            'The Prophet ﷺ stood before people, praised Allah, and mentioned the False Messiah (Dajjal): "No prophet was sent except that he warned his nation against him; indeed Nuh warned his nation against him—yet I tell you something no prophet told his people: know that he is one-eyed while Allah is not one-eyed."',
        },
      },
      {
        stageNumber: 3,
        phaseTitle: '3. Deathbed Will & Supplication of Grateful Servitude',
        where: 'Earthly Ministry After the Flood',
        whatHappened:
          'Living after the flood as the second father of humanity, Nuh (AS) remained constantly grateful in every act—earning Allah’s title "Abdan Shakura"—and delivered a decisive deathbed will to his son.',
        howItUnfolded:
          'On his deathbed, Nuh commanded his son with two supreme practices (La ilaha illallah—which outweighs all seven heavens on a scale—and SubhanAllahi wa bihamdihi) and forbade two fatal sins: shirk (polytheism) and kibr (arrogance).',
        sahihHadith: {
          source: 'Musnad Ahmad 6583 & Al-Adab al-Mufrad 548 (Sahih)',
          narrator: 'Abdullah ibn Amr (RA)',
          textEnglish:
            'The Prophet ﷺ narrated that Nuh’s deathbed command to his son was: "I command you with two things and forbid you two things: I command you with La ilaha illallah, for if the seven heavens and seven earths were placed on one pan of a scale and La ilaha illallah on the other, it would outweigh them; and SubhanAllahi wa bihamdihi, for it is the prayer of every creature. And I forbid you shirk and pride (kibr)!"',
        },
      },
    ],
    revelations: [
      {
        surahNumber: 71,
        ayahNumber: 1,
        ayahRangeLabel: 'Surah Nuh 71:1–28',
        contextEnglish: 'Dedicated chapter recounting Nuh’s 950-year call and prayer.',
      },
    ],
    sahihHadiths: [
      {
        source: 'Sahih al-Bukhari 4712',
        narrator: 'Abu Hurayrah (RA)',
        textEnglish: 'Honors Nuh as the first Messenger sent to mankind and a "most grateful servant."',
      },
      {
        source: 'Musnad Ahmad 6583 (Sahih)',
        narrator: 'Abdullah ibn Amr (RA)',
        textEnglish: 'Nuh’s authentic deathbed testament commanding Tawhid and forbidding pride.',
      },
    ],
  },
  {
    id: 'prophet-4-hud',
    order: 4,
    nameEnglish: 'Hud (AS)',
    title: 'Prophet to the Towering Builders of ‘Ad',
    lineageAndBirth: 'Noble Arab lineage of the mighty tribe of ‘Ad (descended from Sam ibn Nuh)',
    eraAndLocation: 'Al-Ahqaf (Winding Sand-Dunes of Southern Arabia)',
    peopleAndRegion: 'People of ‘Ad ("Iram of the Lofty Pillars")',
    missionSpanOrAge: 'Sent after Nuh’s flood to restore pure worship amidst extreme architectural pride',
    scriptureOrMiracle: 'Spared with the few believers from the roaring seven-night, eight-day gale wind (Dabur)',
    passingAndBurialTradition: 'Departed peacefully with the saved believers in Yemen/Hadramawt or Makkah; exact burial site not pinned by Sahih Hadith.',
    keyTrials: 'Facing arrogant warriors boasting "Who is mightier than us in strength?" and accusing him of madness.',
    hadithExclusiveFacts: [
      {
        title: 'Why Dark Rain Clouds Made Prophet Muhammad ﷺ Restless',
        topicTag: 'Beyond Quran · Sunnah Reflection',
        detail:
          'Aishah (RA) observed whenever dark clouds or brisk winds appeared, the Prophet’s ﷺ expression changed until rain fell, explaining: "I fear lest it be a punishment as came upon the people of Hud when they saw the cloud advancing toward their valleys saying, It is a rain cloud for us!"',
        source: 'Sahih al-Bukhari 3206 & Sahih Muslim 899',
        narrator: 'Aishah (RA)',
      },
      {
        title: 'Contrast Between the West Gale (Dabur) & East Breeze (Saba)',
        topicTag: 'Beyond Quran · Military Miracle',
        detail:
          'Allah destroyed Hud’s arrogant tribe ‘Ad with Ad-Dabur (the westerly gale), whereas millennia later Allah aided Prophet Muhammad ﷺ at the Battle of the Trench with As-Saba (the easterly wind).',
        source: 'Sahih al-Bukhari 3344 & Sahih Muslim 2274',
        narrator: 'Ibn Abbas (RA)',
      },
    ],
    lifeStages: [
      {
        stageNumber: 1,
        phaseTitle: '1. Call to the Arrogant Giants of ‘Ad at Al-Ahqaf',
        where: 'Al-Ahqaf (Southern Arabian Peninsula)',
        whatHappened:
          'Allah bestowed massive physical stature, irrigated gardens, and architectural brilliance upon ‘Ad—yet instead of gratitude, they worshipped idols and brutalized neighboring peoples.',
        howItUnfolded:
          'Hud (AS), one of their own noble brothers, called them kindly without seeking any wage: worship Allah alone and cease tyrannical monuments. They mocked his single-handed courage, daring him to bring punishment.',
        revelation: {
          surahNumber: 11,
          ayahNumber: 50,
          ayahRangeLabel: 'Surah Hud 11:50–60 & Ash-Shu‘ara 26:123–140',
          contextEnglish: 'Hud’s fearless challenge to their combined idols: "Plot against me all together and give me no respite!"',
        },
      },
      {
        stageNumber: 2,
        phaseTitle: '2. Confrontation with Tyranny & Destruction by the West Wind',
        where: 'Valleys of Al-Ahqaf',
        whatHappened:
          'After prolonged drought, ‘Ad rejoiced seeing a wide dark cloud approaching their valleys, assuming rain had come. Hud warned it carried painful punishment.',
        howItUnfolded:
          'For seven nights and eight continuous days, an unrelenting icy wind tore mighty men up like uprooted hollow palm trunks—while Allah rescued Hud and the believers silently by His mercy.',
        revelation: {
          surahNumber: 46,
          ayahNumber: 24,
          ayahRangeLabel: 'Surah Al-Ahqaf 46:24–25 & Al-Haqqah 69:6–8',
          contextEnglish: 'Describes the false raincloud turning into the seven-night, eight-day destructive gale.',
        },
        sahihHadith: {
          source: 'Sahih al-Bukhari 3344 & Sahih Muslim 2274',
          narrator: 'Ibn Abbas (RA)',
          textEnglish:
            'The Prophet ﷺ explicitly linked his victory in the War of the Trench (Khandaq) to Hud’s people, saying: "I have been helped by As-Saba (the easterly breeze), while the people of ‘Ad were destroyed by Ad-Dabur (the westerly gale)."',
        },
      },
    ],
    revelations: [
      {
        surahNumber: 11,
        ayahNumber: 50,
        ayahRangeLabel: 'Surah Hud 11:50–60',
        contextEnglish: 'Complete Quranic account of Hud’s mission and Allah’s rescue of the believers.',
      },
    ],
    sahihHadiths: [
      {
        source: 'Sahih al-Bukhari 3344',
        narrator: 'Ibn Abbas (RA)',
        textEnglish: 'Affirms ‘Ad’s destruction by Ad-Dabur wind in contrast to the easterly breeze assisting the Prophet ﷺ.',
      },
    ],
  },
  {
    id: 'prophet-5-salih',
    order: 5,
    nameEnglish: 'Salih (AS)',
    title: 'Prophet of the Miraculous Rock-Born She-Camel',
    lineageAndBirth: 'Respected member of Thamud before receiving prophethood ("O Salih, you were among us a figure of hope")',
    eraAndLocation: 'Al-Hijr / Mada’in Salih (Northwestern Arabia)',
    peopleAndRegion: 'People of Thamud, carvers of mountain homes',
    missionSpanOrAge: 'Succeeded ‘Ad in northwestern Hijaz',
    scriptureOrMiracle: 'A massive living she-camel brought forth from solid mountain stone with alternating water rights',
    passingAndBurialTradition: 'Moved away with the believers prior to the cosmic blast; passing details beyond that are not specified in Sahih Hadith.',
    keyTrials: 'Nine conspirators plotted to assassinate Salih and his family by night after slaying the miracle she-camel.',
    hadithExclusiveFacts: [
      {
        title: 'Throwing Away Bread Dough Mixed With Thamud’s Well Water',
        topicTag: 'Beyond Quran · Tabuk Event',
        detail:
          'When the Tabuk army camped at Al-Hijr (Thamud’s ruins) in 9 AH, some companions drew well water and kneaded dough. The Prophet ﷺ ordered them to spill the water, feed the dough to camels, and draw solely from the blessed well used by Salih’s She-Camel.',
        source: 'Sahih al-Bukhari 3378–3381 & Sahih Muslim 2980',
        narrator: 'Abdullah ibn Umar (RA)',
      },
    ],
    lifeStages: [
      {
        stageNumber: 1,
        phaseTitle: '1. From Beloved Citizen to Rejected Warner & Miracle of the She-Camel',
        where: 'Wadi al-Qura / Al-Hijr (Northwest Arabia)',
        whatHappened:
          'When Thamud demanded an unmistakable physical proof, Allah caused a living, pregnant she-camel to emerge from solid rock with clear water-sharing days: one day for the camel, the next day for all the town.',
        howItUnfolded:
          'Though struck with awe at first, arrogant elites resented sharing water and oppressed the humble believers—plotting secretly under Qudar ibn Salif to slay the she-camel.',
        revelation: {
          surahNumber: 7,
          ayahNumber: 73,
          ayahRangeLabel: 'Surah Al-A‘raf 7:73–79 & Ash-Shu‘ara 26:141–159',
          contextEnglish: 'Sign of the she-camel and the arrogance of Thamud’s chieftains against the weak.',
        },
      },
      {
        stageNumber: 2,
        phaseTitle: '2. Assassination Conspiracy, Three-Day Reprieve & Prophetic Pass-By',
        where: 'Cliff Fortresses of Al-Hijr (visited later by Prophet Muhammad ﷺ in 9 AH)',
        whatHappened:
          'After killing the she-camel, nine gang leaders swore to murder Salih and his household by night. Allah gave them exactly three days’ warning before the Sayhah (earth-shattering blast) extinguished them at dawn.',
        howItUnfolded:
          'Millennia later, marching through Thamud’s stone ruins en route to Tabuk, Prophet Muhammad ﷺ covered his face and strictly forbade drinking from their unblessed well—permitting only the exact well where the miracle camel drank!',
        revelation: {
          surahNumber: 27,
          ayahNumber: 48,
          ayahRangeLabel: 'Surah An-Naml 27:48–53 & Hud 11:65',
          contextEnglish: 'Details the night assassination plot thwarted by Allah and the rescue of Salih’s believers.',
        },
        sahihHadith: {
          source: 'Sahih al-Bukhari 3378–3381 & Sahih Muslim 2980',
          narrator: 'Abdullah ibn Umar (RA)',
          textEnglish:
            'Passing Al-Hijr (Thamud), the Prophet ﷺ spurred his mount covering his head and said: "Do not enter the dwellings of those who wronged themselves except in a state of weeping, lest what struck them strike you!" And he forbade drawing water from their wells except the exact well from which the She-Camel drank.',
        },
      },
    ],
    revelations: [
      {
        surahNumber: 7,
        ayahNumber: 73,
        ayahRangeLabel: 'Surah Al-A‘raf 7:73–79',
        contextEnglish: 'Complete lesson of Thamud, the she-camel, and Allah’s rescue of Salih (AS).',
      },
    ],
    sahihHadiths: [
      {
        source: 'Sahih al-Bukhari 3379–3381',
        narrator: 'Ibn Umar (RA)',
        textEnglish: 'Prophetic guidance at Thamud’s ruins at Al-Hijr honoring the well of Salih’s she-camel.',
      },
    ],
  },
  {
    id: 'prophet-6-ibrahim',
    order: 6,
    nameEnglish: 'Ibrahim (AS)',
    title: 'Khalilullah · Friend of Allah & Father of Prophets',
    lineageAndBirth: 'Son of Azar in Ur (Mesopotamia); forefather of Isma‘il and Ishaq (AS)',
    eraAndLocation: 'Mesopotamia → Syria → Egypt → Palestine → Makkah',
    peopleAndRegion: 'Idol worshippers of Ur, Tyrant King, and future generations of Makkah & Canaan',
    missionSpanOrAge: 'Passed at advanced old age after fulfilling all commands (Quran 2:124); performed Khitan at age 80 (Bukhari 3356)',
    scriptureOrMiracle: 'Scrolls of Ibrahim; Fire turned cool & safe; raising the Ka‘bah; Zamzam heritage',
    passingAndBurialTradition: 'Completed his covenant cleanly and rests near the Seventh Heaven leaning against Al-Bayt al-Ma‘mur (Bukhari 3207).',
    physicalAppearance: 'Prophet Muhammad ﷺ testified: "I saw Ibrahim during the Night Journey—no man alive resembles him more closely than I myself do!" (Sahih al-Bukhari 3355, Sahih Muslim 165).',
    keyTrials: 'Thrown into blazing fire by his own father’s community, exile, waiting decades for children, test of sacrifice.',
    hadithExclusiveFacts: [
      {
        title: 'Circumcised Himself at Age 80 With an Adze (Qaddum)',
        topicTag: 'Beyond Quran · Devotion',
        detail:
          'Completely unmentioned in the Quran: Sahih al-Bukhari confirms Prophet Ibrahim (AS) obeyed the command of Khitan immediately at age eighty at a place called Qaddum (or using a carpenter’s adze).',
        source: 'Sahih al-Bukhari 3356 & 6298',
        narrator: 'Abu Hurayrah (RA)',
      },
      {
        title: 'Guardian Beneath the Tree of Believers’ Children in Paradise',
        topicTag: 'Beyond Quran · Unseen Paradise',
        detail:
          'In the long dream narration of Sahih al-Bukhari, angels showed the Prophet ﷺ a towering patriarch seated beneath a massive tree inside a lush garden surrounded by young children—explaining it is Ibrahim tending all children who passed away upon the pure Fitrah.',
        source: 'Sahih al-Bukhari 7047',
        narrator: 'Samurah ibn Jundub (RA)',
      },
      {
        title: 'First Human Clothed on the Day of Resurrection',
        topicTag: 'Beyond Quran · Hereafter',
        detail:
          'While all mankind rises barefoot, naked, and uncircumcised, Prophet Ibrahim (AS) will be the very first person clothed with heavenly garments on Judgment Day.',
        source: 'Sahih al-Bukhari 3349 & 6526',
        narrator: 'Ibn Abbas (RA)',
      },
      {
        title: 'Advising the Ummah How to Plant Gardens in Paradise',
        topicTag: 'Beyond Quran · Mi‘raj',
        detail:
          'Leaning against Al-Bayt al-Ma‘mur in the Seventh Heaven, Ibrahim sent personal greetings to this Ummah and told Muhammad ﷺ: Paradise has sweet water and fertile plains whose trees are planted with SubhanAllah, Alhamdulillah, La ilaha illallah, and Allahu Akbar.',
        source: 'Jami‘ at-Tirmidhi 3462 (Sahih)',
        narrator: 'Ibn Mas‘ud (RA)',
      },
    ],
    lifeStages: [
      {
        stageNumber: 1,
        phaseTitle: '1. Youthful Awakening, Smashing Idols & Blazing Furnace',
        where: 'Ur (Ancient Mesopotamia / Iraq)',
        whatHappened:
          'Even as a youth, Ibrahim reasoned logically against star, moon, and stone worship. While citizens attended a festival, he broke the idols leaving the axe on the largest idol—exposing their helplessness before a tyrannical ruler.',
        howItUnfolded:
          'Cast via catapult into an enormous fire, Ibrahim uttered "HasbunAllahu wa ni‘mal-Wakil," and Allah commanded the fire: "Be coolness and safety upon Ibrahim!"—rendering it harmless.',
        revelation: {
          surahNumber: 21,
          ayahNumber: 51,
          ayahRangeLabel: 'Surah Al-Anbiya 21:51–70',
          contextEnglish: 'Debate with idolaters and the cooling of the fire.',
        },
        sahihHadith: {
          source: 'Sahih al-Bukhari 4563',
          narrator: 'Ibn Abbas (RA)',
          textEnglish:
            'Ibn Abbas said: "HasbunAllahu wa ni‘mal-Wakil (Sufficient for us is Allah, and He is the Best Disposer of affairs) was spoken by Ibrahim when he was thrown into the fire, and it was spoken by Muhammad ﷺ when told the confederates had gathered against him."',
        },
      },
      {
        stageNumber: 2,
        phaseTitle: '2. Migration with Sarah & Gift of Hajar in Egypt',
        where: 'Harran → Syria → Egypt',
        whatHappened:
          'Migrating for Allah’s sake with his nephew Lut and wife Sarah, Ibrahim entered Egypt where a tyrant king coveted Sarah. Calling her "my sister [in Islam]" to protect her and spare blood, Allah paralyzed the tyrant three times as Sarah prayed—leading the ruler to release her honoring her with Hajar as attendant.',
        howItUnfolded:
          'At age eighty, obeying Allah’s command immediately, Ibrahim circumcised himself at Qaddum with an adze (Bukhari 3356).',
        sahihHadith: {
          source: 'Sahih al-Bukhari 3356 & 3357–3358',
          narrator: 'Abu Hurayrah (RA)',
          textEnglish:
            'Recounts Ibrahim’s migration through Egypt with Sarah where Allah miraculously paralyzed the tyrant’s hand thrice upon Sarah’s prayer, leading to Hajar’s gift—and confirms Ibrahim circumcised himself at eighty.',
        },
      },
      {
        stageNumber: 3,
        phaseTitle: '3. Settling Hajar & Isma‘il at Makkah, Test of Sacrifice & Building the Ka‘bah',
        where: 'Bakkah (Makkah Valley)',
        whatHappened:
          'Commanded by Allah, Ibrahim left Hajar and nursing Isma‘il beside the barren Sanctuary site with only dates and water. Seeing him walk away without looking back, Hajar realized Allah commanded it and declared: "Then He will never abandon us!" Later, he passed the dream-command of sacrifice and returned to rebuild the Ka‘bah alongside adult Isma‘il.',
        howItUnfolded:
          'Standing on Maqam Ibrahim to elevate the walls while Isma‘il handed stones, both supplicated: "Our Lord, accept from us"—and Allah raised from Isma‘il’s lineage Prophet Muhammad ﷺ.',
        revelation: {
          surahNumber: 2,
          ayahNumber: 127,
          ayahRangeLabel: 'Surah Al-Baqarah 2:127–129 & As-Saffat 37:102',
          contextEnglish: 'Raising the Ka‘bah’s foundations and praying for a Messenger from their progeny.',
        },
        sahihHadith: {
          source: 'Sahih al-Bukhari 3364–3365',
          narrator: 'Ibn Abbas (RA)',
          textEnglish:
            'One of the longest, richest Sahih biographies in Bukhari detailing Hajar’s trust in Allah, running between Safa and Marwah, Zamzam’s eruption, Jurhum settling in Makkah, Ibrahim’s visits to Isma‘il’s household, and both building the House of Allah while reciting "Rabbana taqabbal minna."',
        },
      },
      {
        stageNumber: 4,
        phaseTitle: '4. Seventh Heaven Sanctuary & Honoring Before Mankind',
        where: 'Seventh Heaven (Al-Bayt al-Ma‘mur)',
        whatHappened:
          'At the summit of all seven heavens, Prophet Muhammad ﷺ beheld Ibrahim (AS)—whom he most closely resembled in appearance—leaning his back against Al-Bayt al-Ma‘mur, where 70,000 angels enter in worship each day never to return.',
        howItUnfolded:
          'Ibrahim sent warm greetings to the Muslim Ummah, advising them to plant trees in Paradise through SubhanAllah, Alhamdulillah, La ilaha illallah, and Allahu Akbar (Sahih Tirmidhi 3462).',
        sahihHadith: {
          source: 'Sahih al-Bukhari 3207 & 3355',
          narrator: 'Malik ibn Sa‘sa‘ah & Jabir (RA)',
          textEnglish:
            'In the Seventh Heaven I saw Ibrahim resting against Al-Bayt al-Ma‘mur... And he most closely resembles your companion [Muhammad ﷺ]. He greeted me saying: "Welcome, O pious son and pious Prophet!"',
        },
      },
    ],
    revelations: [
      {
        surahNumber: 2,
        ayahNumber: 124,
        ayahRangeLabel: 'Surah Al-Baqarah 2:124–129',
        contextEnglish: 'Tests passed cleanly, Imam of mankind, and building the Ka‘bah.',
      },
    ],
    sahihHadiths: [
      {
        source: 'Sahih al-Bukhari 3364–3365',
        narrator: 'Ibn Abbas (RA)',
        textEnglish: 'Complete Sahih account of settling Hajar & Isma‘il in Makkah and raising the Ka‘bah.',
      },
      {
        source: 'Sahih al-Bukhari 3357–3358',
        narrator: 'Abu Hurayrah (RA)',
        textEnglish: 'Defense of Sarah in Egypt and divine protection against the tyrant.',
      },
    ],
  },
  {
    id: 'prophet-7-lut',
    order: 7,
    nameEnglish: 'Lut (AS)',
    title: 'Prophet of Moral Integrity & Steadfastness',
    lineageAndBirth: 'Nephew of Ibrahim (AS); migrated with him from Ur before assignment to Sodom',
    eraAndLocation: 'Towns of Sodom & Gomorrah (Dead Sea Plain)',
    peopleAndRegion: 'Towns inventing unprecedented moral depravity and highway violence',
    missionSpanOrAge: 'Contemporaneous with Ibrahim (AS)',
    scriptureOrMiracle: 'Angelic rescue before dawn while the towns were lifted and overturned',
    passingAndBurialTradition: 'Guided away safely with his believing daughters before sunrise; later years unrecorded in Sahih Hadith.',
    keyTrials: 'Complete isolation in a depraved city; even his own wife sided with wicked townspeople.',
    hadithExclusiveFacts: [
      {
        title: 'Why Every Prophet After Lut Came From Protective Noble Kin',
        topicTag: 'Beyond Quran · Prophetic Pattern',
        detail:
          'Reflecting on Lut’s lonely cry at Sodom ("Would that I had strength or refuge in a strong support!"), Prophet Muhammad ﷺ observed tenderly that Lut actually relied on the Strongest Support (Allah), and from that day onward Allah sent no prophet except inside a strong protective clan.',
        source: 'Sahih al-Bukhari 3372 & Sahih Muslim 151',
        narrator: 'Abu Hurayrah (RA)',
      },
    ],
    lifeStages: [
      {
        stageNumber: 1,
        phaseTitle: '1. Early Belief Under Ibrahim & Mission in Sodom',
        where: 'Mesopotamia → Sodom (Jordan Valley)',
        whatHappened:
          'Lut believed immediately in Ibrahim’s call in Iraq, migrated alongside him, and was dispatched by Allah to warn Sodom against robbing travelers and committing unnatural lewdness no previous nation had practiced.',
        howItUnfolded:
          'Alone without a defending clan, Lut stood firm year after year while townsfolk threatened to expel his pure family for being "people who keep clean."',
        revelation: {
          surahNumber: 7,
          ayahNumber: 80,
          ayahRangeLabel: 'Surah Al-A‘raf 7:80–84 & Al-‘Ankabut 29:26',
          contextEnglish: 'Lut’s early faith with Ibrahim and solitary warning to Sodom.',
        },
      },
      {
        stageNumber: 2,
        phaseTitle: '2. Angelic Guests, Night Rescue & Dawn Overturning',
        where: 'House of Lut in Sodom',
        whatHappened:
          'Angels visiting Ibrahim in human form walked to Sodom. Distressed over protecting his young guests from a mob pounding at his door, Lut sighed wishing for strong earthly support—prompting Prophet Muhammad’s ﷺ tender remark on Lut’s reliance on Allah.',
        howItUnfolded:
          'Blinding the mob at the threshold, the angels revealed their true identity, ordered Lut to march out with his household before dawn without looking back, and overturned the towns beneath inscribed stones of baked clay.',
        revelation: {
          surahNumber: 11,
          ayahNumber: 77,
          ayahRangeLabel: 'Surah Hud 11:77–83',
          contextEnglish: 'Tense night siege at Lut’s door and miraculous pre-dawn departure.',
        },
        sahihHadith: {
          source: 'Sahih al-Bukhari 3372 & Sahih Muslim 151',
          narrator: 'Abu Hurayrah (RA)',
          textEnglish:
            'Reciting Lut’s words "Would that I had strength against you or could take refuge in a strong support," the Prophet ﷺ said compassionately: "May Allah have mercy on Lut! He was indeed taking refuge in the Strongest Support (Allah)!"',
        },
      },
    ],
    revelations: [
      {
        surahNumber: 11,
        ayahNumber: 77,
        ayahRangeLabel: 'Surah Hud 11:77–83',
        contextEnglish: 'Detailed narrative of the angelic rescue and destruction of Sodom.',
      },
    ],
    sahihHadiths: [
      {
        source: 'Sahih al-Bukhari 3372',
        narrator: 'Abu Hurayrah (RA)',
        textEnglish: 'Prophetic tribute to Lut’s absolute dependence on Allah as his Strongest Support.',
      },
    ],
  },
  {
    id: 'prophet-8-ismail',
    order: 8,
    nameEnglish: 'Isma‘il (AS)',
    title: 'As-Sadiq al-Wa‘d · Firstborn Prophet & Co-Builder of the Ka‘bah',
    lineageAndBirth: 'Firstborn son of Ibrahim (AS) and Hajar (AS); ancestor of the Prophet Muhammad ﷺ',
    eraAndLocation: 'Makkah al-Mukarramah',
    peopleAndRegion: 'Jurhum & Arabian inhabitants of Hijaz',
    missionSpanOrAge: 'Lifespan of ~137 years per classical historians; buried beside Hajar inside Al-Hijr (Hatim)',
    scriptureOrMiracle: 'Zamzam spring bursting under Jibril’s wing; willing consent in sacrifice; co-builder of the Ka‘bah',
    passingAndBurialTradition: 'Taught his family prayer and zakah throughout life (Q 19:55), remaining honored in Makkah.',
    keyTrials: 'Near-death thirst as an infant in a desolate valley; supreme test of sacrifice in youth.',
    hadithExclusiveFacts: [
      {
        title: 'Master Bow-Archer & Ancestor of Quraysh',
        topicTag: 'Beyond Quran · Lineage & Skill',
        detail:
          'Passing a group of young companions practicing archery in Madinah, the Prophet ﷺ urged them: "Shoot, O sons of Isma‘il, for your father was a skilled archer!" And in Sahih Muslim 2276 he confirmed Allah handpicked Isma‘il, Kinanah, Quraysh, and Banu Hashim.',
        source: 'Sahih al-Bukhari 3373 & Sahih Muslim 2276',
        narrator: 'Salamah ibn al-Akwa‘ & Wathilah (RA)',
      },
      {
        title: 'Why Zamzam & Meat Alone Sustain Health in Makkah',
        topicTag: 'Beyond Quran · Makkah Founding',
        detail:
          'In Sahih al-Bukhari 3364, when Isma‘il’s grateful second wife welcomed traveler Ibrahim with only meat and water (no grain grew in Makkah yet), Ibrahim blessed both their meat and water so living upon Zamzam and meat brought flourishing health instead of illness.',
        source: 'Sahih al-Bukhari 3364',
        narrator: 'Ibn Abbas (RA)',
      },
    ],
    lifeStages: [
      {
        stageNumber: 1,
        phaseTitle: '1. Infant Trial in Barren Makkah & Eruption of Zamzam',
        where: 'Safa, Marwah & Sanctuary Hollow, Makkah',
        whatHappened:
          'When food and water ran out, Hajar hurried seven times between Safa and Marwah searching for rescue until she heard an angel’s voice. Angel Jibril dug at the spot near Zamzam with his heel/wing until pure life-giving water gushed forth.',
        howItUnfolded:
          'Soon Yemenite travelers of Jurhum asked Hajar’s permission to settle beside the spring. Raised among them, Isma‘il learned fluent classical Arabic and archery.',
        sahihHadith: {
          source: 'Sahih al-Bukhari 3364 & 3373',
          narrator: 'Ibn Abbas & Salamah ibn al-Akwa‘ (RA)',
          textEnglish:
            'Bukhari 3364 traces Isma‘il’s survival via Zamzam under Jibril’s wing and Jurhum’s arrival; and in Bukhari 3373 the Prophet ﷺ encouraged companions practicing with bows: "Shoot, O sons of Isma‘il, for your father was a skilled archer!"',
        },
      },
      {
        stageNumber: 2,
        phaseTitle: '2. Willing Submission to Sacrifice & Rebuilding the Ka‘bah',
        where: 'Mina & Al-Masjid al-Haram, Makkah',
        whatHappened:
          'When Ibrahim shared his prophetic dream of sacrificing him, young Isma‘il answered without hesitation: "O my father, do as you are commanded; you will find me, if Allah wills, among the patient." Ransomed by Allah with a magnificent ram, Isma‘il later assisted his aging father in rebuilding the Ka‘bah.',
        howItUnfolded:
          'Passing through a marital test documented in Sahih Bukhari 3364—where Ibrahim visited secretly and advised changing his "threshold" after his first wife complained of poverty—Isma‘il married a grateful Jurhum woman, raised twelve clans, and stood faithfully beside Ibrahim handing stones to build Allah’s House.',
        revelation: {
          surahNumber: 37,
          ayahNumber: 102,
          ayahRangeLabel: 'Surah As-Saffat 37:102–107 & Maryam 19:54–55',
          contextEnglish: 'Isma‘il’s courageous submission and Quranic praise for keeping promises, salah, and zakah.',
        },
        sahihHadith: {
          source: 'Sahih al-Bukhari 3364–3365',
          narrator: 'Ibn Abbas (RA)',
          textEnglish:
            'Records Ibrahim’s two visits to adult Isma‘il in Makkah—the coded message of the "threshold"—and finally father and son lifting the Ka‘bah walls together near the Zamzam well.',
        },
      },
    ],
    revelations: [
      {
        surahNumber: 19,
        ayahNumber: 54,
        ayahRangeLabel: 'Surah Maryam 19:54–55 & As-Saffat 37:102',
        contextEnglish: 'Testifies to his promise-keeping, salah, zakah, and submission.',
      },
    ],
    sahihHadiths: [
      {
        source: 'Sahih al-Bukhari 3364–3365',
        narrator: 'Ibn Abbas (RA)',
        textEnglish: 'Comprehensive authentic account of Isma‘il’s infancy, Zamzam, archery, marriages, and building the Ka‘bah.',
      },
    ],
  },
  {
    id: 'prophet-9-ishaq',
    order: 9,
    nameEnglish: 'Ishaq (AS)',
    title: 'Prophet of Glad Tidings & Forefather of Bani Isra’il',
    lineageAndBirth: 'Born miraculously to Ibrahim and elderly barren Sarah (Q 11:71–73)',
    eraAndLocation: 'Al-Khalil (Hebron) & Canaan / Greater Syria',
    peopleAndRegion: 'Peoples of Canaan and Levant',
    missionSpanOrAge: 'Lifespan ~180 years per classical accounts',
    scriptureOrMiracle: 'Announced directly by angels visiting Ibrahim; father of twins Ya‘qub and Al-‘Is',
    passingAndBurialTradition: 'Guided communities in righteousness and wisdom until passing peacefully in Canaan.',
    keyTrials: 'Upholding Ibrahim’s pure monotheistic covenant across idolatrous Canaanite towns.',
    hadithExclusiveFacts: [
      {
        title: 'Praised in the "Four-Generation Noble Prophet" Narration',
        topicTag: 'Beyond Quran · Honor',
        detail:
          'When companions asked who was the noblest of mankind, the Prophet ﷺ specifically honored the four-generation link of Yusuf ibn Ya‘qub ibn Ishaq ibn Ibrahim (AS), affirming their unbroken prophetic sanctity.',
        source: 'Sahih al-Bukhari 3382 & 4688',
        narrator: 'Abu Hurayrah (RA)',
      },
    ],
    lifeStages: [
      {
        stageNumber: 1,
        phaseTitle: '1. Miraculous Announcement & Birth to Aged Parents',
        where: 'Hebron / Greater Syria',
        whatHappened:
          'En route to Sodom, angels brought Ibrahim and Sarah astonishing glad tidings: they would bear Ishaq, and through Ishaq a grandson Ya‘qub. Astonished at her white-haired age, Sarah exclaimed in wonder—yet the angels affirmed "Thus says your Lord."',
        howItUnfolded:
          'Allah granted Ishaq spiritual depth, pure insight, and righteous leadership—forming the celebrated "golden prophetic chain" praised explicitly by Prophet Muhammad ﷺ.',
        revelation: {
          surahNumber: 11,
          ayahNumber: 71,
          ayahRangeLabel: 'Surah Hud 11:71–73 & Sad 38:45–47',
          contextEnglish: 'Angelic announcement of Ishaq & Ya‘qub and praise of their insight and strength in worship.',
        },
        sahihHadith: {
          source: 'Sahih al-Bukhari 3382',
          narrator: 'Abu Hurayrah (RA)',
          textEnglish:
            'When asked "Who is the most noble among mankind?", the Prophet ﷺ highlighted this honored lineage: "The most noble is Yusuf, Prophet of Allah, son of the Prophet of Allah [Ya‘qub], son of the Prophet of Allah [Ishaq], son of the Friend of Allah [Ibrahim]!"',
        },
      },
    ],
    revelations: [
      {
        surahNumber: 38,
        ayahNumber: 45,
        ayahRangeLabel: 'Surah Sad 38:45–47',
        contextEnglish: 'Honors Ibrahim, Ishaq, and Ya‘qub as chosen servants pure in remembrance of the Hereafter.',
      },
    ],
    sahihHadiths: [
      {
        source: 'Sahih al-Bukhari 3382',
        narrator: 'Abu Hurayrah (RA)',
        textEnglish: 'Affirms Ishaq’s exalted four-generation prophetic chain.',
      },
    ],
  },
  {
    id: 'prophet-10-yaqub',
    order: 10,
    nameEnglish: 'Ya‘qub (AS)',
    title: 'Isra’il · Paragon of Beautiful Patience (Sabrun Jamil)',
    lineageAndBirth: 'Son of Ishaq (AS), grandson of Ibrahim (AS); father of the twelve tribes',
    eraAndLocation: 'Canaan / Hebron → Egypt',
    peopleAndRegion: 'Twelve Tribes of Israel (Bani Isra’il)',
    missionSpanOrAge: 'Reunited with Yusuf after decades of separation; lived 17 serene years in Egypt',
    scriptureOrMiracle: 'Vision restored miraculously when Yusuf’s shirt was placed over his face',
    passingAndBurialTradition: 'On his deathbed gathered all sons asking: "What will you worship after me?" securing their covenant to Islam alone (Q 2:133).',
    keyTrials: 'Decades of blinding grief over losing Yusuf and later Binyamin without once accusing Allah.',
    hadithExclusiveFacts: [
      {
        title: 'Modeled Directly by Aishah (RA) During Her Hardest Trial',
        topicTag: 'Beyond Quran · Sirah Example',
        detail:
          'Facing agonizing false rumors in Madinah until Allah revealed her innocence, Mother of the Believers Aishah (RA) could not even recall Ya‘qub’s name through her tears—invoking only his title "the father of Yusuf" and anchoring her heart in his words: Sabrun Jamil.',
        source: 'Sahih al-Bukhari 4141 & 4750',
        narrator: 'Aishah (RA)',
      },
    ],
    lifeStages: [
      {
        stageNumber: 1,
        phaseTitle: '1. Patriarch of Twelve Sons & Test of Separation',
        where: 'Canaan',
        whatHappened:
          'When ten older sons returned claiming a wolf devoured young Yusuf—producing a bloodstained shirt that was miraculously untorn—Ya‘qub saw through the deceit immediately and chose "Sabrun Jamil" (graceful patience without complaint to humans).',
        howItUnfolded:
          'Years later after losing Binyamin in Egypt too, his eyes turned white with grief—yet his certainty in Allah never wavered: "Never despair of Allah’s soothing mercy; none despairs of Allah’s relief except disbelievers."',
        revelation: {
          surahNumber: 12,
          ayahNumber: 83,
          ayahRangeLabel: 'Surah Yusuf 12:83–87',
          contextEnglish: 'Ya‘qub’s immortal stance: "I only complain of my anguish and grief to Allah."',
        },
        sahihHadith: {
          source: 'Sahih al-Bukhari 4141 & 4689',
          narrator: 'Aishah (RA)',
          textEnglish:
            'During her month of painful trial over the slander at Al-Muraysi‘, Mother of the Believers Aishah (RA) found her sole solace in reciting Prophet Ya‘qub’s exact words: "I find no better example for myself and you than the father of Yusuf when he said: So patience is most fitting, and Allah is the one sought for help!"',
        },
      },
      {
        stageNumber: 2,
        phaseTitle: '2. Miraculous Reunion in Egypt & Final Tawhid Covenant',
        where: 'Egypt (Memphis / Goshen)',
        whatHappened:
          'Recognizing Yusuf’s scent miles before the caravan reached Canaan, Ya‘qub regained sight instantly when Yusuf’s shirt touched his eyes, traveled to Egypt, and saw Yusuf’s childhood dream fulfilled cleanly.',
        howItUnfolded:
          'As death approached, Ya‘qub’s overriding worry was neither wealth nor land, but his sons’ creed—asking them directly: "What will you worship after me?"',
        revelation: {
          surahNumber: 2,
          ayahNumber: 133,
          ayahRangeLabel: 'Surah Al-Baqarah 2:133 & Yusuf 12:93–100',
          contextEnglish: 'Reunion prostration of honor and his final testament on pure Tawhid.',
        },
      },
    ],
    revelations: [
      {
        surahNumber: 12,
        ayahNumber: 86,
        ayahRangeLabel: 'Surah Yusuf 12:83–96',
        contextEnglish: 'Endurance, hope in Allah, and restoration of sight.',
      },
    ],
    sahihHadiths: [
      {
        source: 'Sahih al-Bukhari 4141',
        narrator: 'Aishah (RA)',
        textEnglish: 'Aishah (RA) explicitly modeled her patience on Ya‘qub’s "Sabrun Jamil."',
      },
    ],
  },
  {
    id: 'prophet-11-yusuf',
    order: 11,
    nameEnglish: 'Yusuf (AS)',
    title: 'Al-Karim · "The Best of Stories"',
    lineageAndBirth: 'Son of Ya‘qub, son of Ishaq, son of Ibrahim ("The Noble, son of the Noble..." — Bukhari 3382)',
    eraAndLocation: 'Canaan → Well → Slave Market → Prison → Treasury of Egypt',
    peopleAndRegion: 'Egyptians & Twelve Tribes of Israel',
    missionSpanOrAge: 'Passed in Egypt crying out: "Cause me to die as a Muslim and join me with the righteous"',
    scriptureOrMiracle: 'Half of all beauty granted (Sahih Muslim 162); infallible interpretation of dreams; seven-year famine rescue',
    passingAndBurialTradition: 'Passed in Egypt having fulfilled family unity, national salvation, and complete forgiveness.',
    physicalAppearance: 'Witnessed in the Third Heaven having been granted half of all human beauty (Sahih Muslim 162).',
    keyTrials: 'Thrown into a dark well by brothers, sold as slave, seduction temptation, years forgotten in prison, weight of power.',
    hadithExclusiveFacts: [
      {
        title: 'Bestowed Half of All Beauty Among Creation',
        topicTag: 'Beyond Quran · Physical Trait',
        detail:
          'Ascending to the Third Heaven during Al-Isra wal-Mi‘raj, Prophet Muhammad ﷺ beheld Yusuf (AS) radiant in beauty and stated clearly: "Indeed he had been given half of all beauty!"',
        source: 'Sahih Muslim 162',
        narrator: 'Anas ibn Malik (RA)',
      },
      {
        title: 'Astonishing Self-Control Staying in Prison Until Exonerated',
        topicTag: 'Beyond Quran · Character',
        detail:
          'The Prophet ﷺ admired Yusuf’s poise in sending the King’s messenger back to investigate the noblewomen first—saying modestly: "Had I lingered in prison as long as Yusuf did and the royal summoner came, I would have walked right out!"',
        source: 'Sahih al-Bukhari 3372 & 4700',
        narrator: 'Abu Hurayrah (RA)',
      },
    ],
    lifeStages: [
      {
        stageNumber: 1,
        phaseTitle: '1. Dream of Eleven Stars, Betrayal into the Well & Egypt Slavery',
        where: 'Canaan → Caravan Road → Palace of Egypt’s Chief Minister',
        whatHappened:
          'Dreaming that eleven stars, the sun, and the moon bowed to him, Yusuf was thrown by jealous half-brothers into a deep well, picked up by water-drawers, and sold into Egypt.',
        howItUnfolded:
          'Raised inside the palace, he faced relentless seduction by his master’s wife. Preferring prison over sin ("My Lord, prison is dearer to me than what they call me to"), he remained locked up for years even though the evidence proved his innocence.',
        revelation: {
          surahNumber: 12,
          ayahNumber: 23,
          ayahRangeLabel: 'Surah Yusuf 12:4–35',
          contextEnglish: 'Betrayal, steadfast chastity, and choosing prison over disobedience.',
        },
      },
      {
        stageNumber: 2,
        phaseTitle: '2. Prison Da‘wah, Royal Dream Interpretation & Exoneration',
        where: 'Egyptian Royal Prison',
        whatHappened:
          'Preaching Tawhid to fellow inmates before interpreting their dreams, Yusuf waited patiently until the King dreamed of seven lean cows devouring seven fat cows. Refusing release without clearing his name publicly, he won total exoneration.',
        howItUnfolded:
          'Prophet Muhammad ﷺ marveled aloud at Yusuf’s extraordinary restraint in refusing to exit prison immediately until the women testified to his innocence.',
        sahihHadith: {
          source: 'Sahih al-Bukhari 3372 & 4700 & 3207',
          narrator: 'Abu Hurayrah & Anas (RA)',
          textEnglish:
            'The Prophet ﷺ said: "May Allah have mercy on my brother Yusuf! Had I stayed in prison as long as he did and the king’s envoy came to summon me, I would have hastened out immediately [without first demanding inquiry]." And in Sahih Muslim 162, he met Yusuf in the Third Heaven having been given half of all beauty.',
        },
      },
      {
        stageNumber: 3,
        phaseTitle: '3. Saving Egypt from Famine & Unconditional Forgiveness',
        where: 'Seat of Governance in Egypt',
        whatHappened:
          'Appointed steward over the storehouses, Yusuf strategically saved grain during seven fertile years—turning Egypt into a lifeline during the seven-year regional famine when his own brothers arrived begging for grain.',
        howItUnfolded:
          'Carefully reuniting them with repentance and compassion, he forgave them completely: "No blame will there be upon you today; may Allah forgive you"—the exact words Prophet Muhammad ﷺ later echoed at the Conquest of Makkah!',
        revelation: {
          surahNumber: 12,
          ayahNumber: 92,
          ayahRangeLabel: 'Surah Yusuf 12:54–101',
          contextEnglish: 'Wise governance, famine relief, brotherly reconciliation, and final prayer to die a Muslim.',
        },
      },
    ],
    revelations: [
      {
        surahNumber: 12,
        ayahNumber: 3,
        ayahRangeLabel: 'Surah Yusuf 12:1–111',
        contextEnglish: 'The entire Surah recounts every phase of Yusuf’s life.',
      },
    ],
    sahihHadiths: [
      {
        source: 'Sahih al-Bukhari 3372 & 3382',
        narrator: 'Abu Hurayrah (RA)',
        textEnglish: 'Honors Yusuf’s unmatched four-generation lineage and dignified patience in demanding public exoneration.',
      },
    ],
  },
  {
    id: 'prophet-12-ayyub',
    order: 12,
    nameEnglish: 'Ayyub (AS)',
    title: 'Paragon of Gratitude & Endurance Under Affliction',
    lineageAndBirth: 'Noble servant from the descendants of Ishaq/Ibrahim (Quran 6:84)',
    eraAndLocation: 'Hauran / Levant Region',
    peopleAndRegion: 'People of Hauran (Southern Syria / Jordan)',
    missionSpanOrAge: 'Endured severe illness for many years without ceasing praise of Allah',
    scriptureOrMiracle: 'Cool healing spring struck by stamping his foot; golden locusts showered upon recovery',
    passingAndBurialTradition: 'Granted doubled household and blessing as "an excellent servant; indeed he repeatedly turned to Allah."',
    keyTrials: 'Loss of children, extensive wealth, health, and social companionship for years—yet never uttering a word of bitterness.',
    hadithExclusiveFacts: [
      {
        title: 'Duration of His Affliction (18 Years)',
        topicTag: 'Beyond Quran · Biography',
        detail:
          'Authentic Hadith collections clarify that Ayyub’s trial lasted eighteen full years during which friends and relatives drifted away except two faithful brothers who comforted him morning and evening—even when slandered behind his back, he never stopped worshipping Allah gratefully.',
        source: 'Sahih Ibn Hibban 2898 & Musnad Abu Ya‘la (Sahih)',
        narrator: 'Anas ibn Malik (RA)',
      },
      {
        title: 'Shower of Golden Locusts While Bathing',
        topicTag: 'Beyond Quran · Miracle',
        detail:
          'Right after healing in the miraculous spring, pure golden locusts rained over Ayyub and he gathered them eagerly into his robe—answering Allah’s gentle question with timeless gratitude: "I can never have enough of Your blessing!"',
        source: 'Sahih al-Bukhari 279 & 3391',
        narrator: 'Abu Hurayrah (RA)',
      },
    ],
    lifeStages: [
      {
        stageNumber: 1,
        phaseTitle: '1. Years of Severe Trial & Humble Supplication',
        where: 'Outskirts of Hauran',
        whatHappened:
          'Blessed initially with large family, estates, and health, Ayyub lost everything and suffered debilitating skin and bodily illness—while his loyal wife supported him patiently.',
        howItUnfolded:
          'Never blaming Allah, he uttered one gentle prayer full of etiquette: "Indeed adversity has touched me, and You are the Most Merciful of the merciful." Allah instructed him to strike the earth with his foot, bringing forth cool water to bathe in and drink—restoring youthful strength completely.',
        revelation: {
          surahNumber: 21,
          ayahNumber: 83,
          ayahRangeLabel: 'Surah Al-Anbiya 21:83–84 & Sad 38:41–44',
          contextEnglish: 'Healing spring, restoration of double family, and solution to his hasty oath regarding his faithful wife.',
        },
      },
      {
        stageNumber: 2,
        phaseTitle: '2. Shower of Golden Locusts & Eternal Gratitude',
        where: 'Bathing Spring of Healing',
        whatHappened:
          'While Ayyub bathed in the miraculous spring right after recovery, Allah rained pure golden locusts over him—and he hurriedly gathered them in his garment without shame.',
        howItUnfolded:
          'When Allah asked if He had not already made him wealthy enough, Ayyub replied: "Yes, by Your Might! Yet I can never have enough of Your blessing!"',
        sahihHadith: {
          source: 'Sahih al-Bukhari 279 & 3391',
          narrator: 'Abu Hurayrah (RA)',
          textEnglish:
            'The Prophet ﷺ narrated: "While Ayyub was bathing naked after healing, golden locusts began falling upon him, and Ayyub started scooping them into his garment. His Lord called to him: O Ayyub, have I not made you self-sufficient from what you see? He said: Yes, O Lord! But I can never be free of need for Your blessing!"',
        },
      },
    ],
    revelations: [
      {
        surahNumber: 38,
        ayahNumber: 41,
        ayahRangeLabel: 'Surah Sad 38:41–44',
        contextEnglish: 'Miracle of the healing spring and praise of Ayyub’s patience.',
      },
    ],
    sahihHadiths: [
      {
        source: 'Sahih al-Bukhari 279 & 3391',
        narrator: 'Abu Hurayrah (RA)',
        textEnglish: 'Authentic narration of the golden locusts demonstrating gratitude even after restoration.',
      },
    ],
  },
  {
    id: 'prophet-13-shuayb',
    order: 13,
    nameEnglish: 'Shu‘ayb (AS)',
    title: 'Khatib al-Anbiya · Orator of the Prophets',
    lineageAndBirth: 'Sent from among the people of Madyan ("Your brother Shu‘ayb")',
    eraAndLocation: 'Madyan (Midian) & Al-Aykah (Northwestern Arabia near Aqaba)',
    peopleAndRegion: 'Commercial townspeople of Madyan',
    missionSpanOrAge: 'Ministered in Madyan across generations (prior to and/or intersecting Musa’s exile)',
    scriptureOrMiracle: 'Eloquence confronting economic cheating; spared from the Day of the Canopy & Earthquake',
    passingAndBurialTradition: 'Saved with his believers before Madyan’s ruin; his grave location is not established in Sahih Hadith.',
    keyTrials: 'Merchants threatening to stone or expel him simply for linking worship of Allah with honest weights and measures.',
    hadithExclusiveFacts: [
      {
        title: 'Prophetic Tradition of Honorable Shepherding',
        topicTag: 'Contextual Sahih Verification',
        detail:
          'While Shu‘ayb’s eloquence is preserved fully inside the Quran, Sahih al-Bukhari 2262 underscores how Allah trained every single prophet in shepherding flocks (just as in Madyan) to cultivate humility, alertness, and patience before leading nations.',
        source: 'Sahih al-Bukhari 2262',
        narrator: 'Abu Hurayrah (RA)',
      },
    ],
    lifeStages: [
      {
        stageNumber: 1,
        phaseTitle: '1. Preaching Economic Justice & Pure Monotheism',
        where: 'Markets & Highways of Madyan',
        whatHappened:
          'Wealthy Madyan merchants mocked his link between Salah and fair trading scales: "Does your prayer command you that we abandon what our fathers worshipped or what we do with our wealth?"',
        howItUnfolded:
          'Shu‘ayb answered gently: "I only intend reform as much as I am able, and my success is solely through Allah." When they persisted in ambushing travelers and cheating the poor, an intense heat drove them under a dark cloud (Yawm az-Zullah) which rained fire above an earthquake.',
        revelation: {
          surahNumber: 11,
          ayahNumber: 84,
          ayahRangeLabel: 'Surah Hud 11:84–95 & Ash-Shu‘ara 26:176–191',
          contextEnglish: 'Shu‘ayb’s famous defense of fair scales, peaceful reform, and the Day of the Shadow.',
        },
        sahihHadith: {
          source: 'Sahih al-Bukhari 2262 (Contextual Link on Madyan)',
          narrator: 'Ibn Abbas & Abu Hurayrah (RA)',
          textEnglish:
            'While Shu‘ayb’s preaching is preserved directly in the Quran, Sahih al-Bukhari 2262 confirms the prophetic tradition of dignified labor in Madyan where Prophet Musa (AS) worked eight or ten years herding sheep for a righteous elder of Madyan before returning to Egypt.',
        },
      },
    ],
    revelations: [
      {
        surahNumber: 11,
        ayahNumber: 84,
        ayahRangeLabel: 'Surah Hud 11:84–95',
        contextEnglish: 'Complete Quranic record of Shu‘ayb’s prophetic mission.',
      },
    ],
    sahihHadiths: [],
  },
  {
    id: 'prophet-14-musa',
    order: 14,
    nameEnglish: 'Musa (AS)',
    title: 'Kalimullah · Direct Interlocutor of Allah & Deliverer of Bani Isra’il',
    lineageAndBirth: 'Son of Imran from the Tribe of Levi; born during Pharaoh’s slaughter of newborn boys',
    eraAndLocation: 'Egypt → Madyan → Mount Sinai → Plains of Jordan/Moab',
    peopleAndRegion: 'Pharaoh’s Egypt & Children of Israel (most mentioned Prophet in the Quran)',
    missionSpanOrAge: '10 years in Madyan + decades leading the Exodus & wilderness generation until age ~120',
    scriptureOrMiracle: 'The Torah (Tawrah); Staff-serpent, radiant hand, nine plagues, parting the Red Sea, water from rock',
    passingAndBurialTradition: 'Passed at Kathib al-Ahmar ("a stone’s throw from the Sacred Land") after striking the Angel of Death—grave pointed out by Muhammad ﷺ in Sahih al-Bukhari 1339.',
    physicalAppearance: 'Tall, dark-wheat complexion (Adam), compact curly hair, sturdy athletic build resembling the vigorous men of the Tribe of Shanu’ah; seen chanting Talbiyah at Wadi al-Azraq (Sahih al-Bukhari 3239 & Sahih Muslim 165–166).',
    keyTrials: 'Pharaoh’s tyranny, Exodus sea chase, Golden Calf betrayal, chronic ingratitude of his people.',
    hadithExclusiveFacts: [
      {
        title: 'The Fleeing Stone Miracle Vindicating His Modesty',
        topicTag: 'Beyond Quran · Miracle',
        detail:
          'Unlike Bani Isra’il who bathed publicly naked, Musa (AS) always bathed privately in extreme modesty—causing gossipers to claim he hid a bodily defect. One day when Musa left his garment on a rock to bathe, Allah caused the boulder to bolt away with his clothes! Chasing it barefoot crying "My garment, O stone!" past their assembly proved Allah had created him completely free of blemish (explaining Q 33:69).',
        source: 'Sahih al-Bukhari 278 & 3404',
        narrator: 'Abu Hurayrah (RA)',
      },
      {
        title: 'Slapping the Angel of Death & Choosing Proximity to Al-Quds',
        topicTag: 'Beyond Quran · Passing',
        detail:
          'When the Angel of Death approached Musa disguised as a man, Musa struck him in fierce self-defense knocking out his eye. Returning by Allah’s leave, the Angel offered years equal to every hair under Musa’s palm on a bull’s back—yet Musa chose immediate death so long as it was "within a stone’s throw of the Sacred Land" at Kathib al-Ahmar.',
        source: 'Sahih al-Bukhari 1339 & 3407',
        narrator: 'Abu Hurayrah (RA)',
      },
      {
        title: 'Standing in Prayer Inside His Grave & Pilgrimage Along Al-Azraq',
        topicTag: 'Beyond Quran · Barzakh',
        detail:
          'During Al-Isra, Prophet Muhammad ﷺ passed beside the Red Sandhill (Al-Kathib al-Ahmar) and glimpsed Musa (AS) standing upright praying in his grave—and also beheld him riding toward Makkah reciting "Labbayk Allahumma Labbayk" through Wadi al-Azraq.',
        source: 'Sahih Muslim 166 & 2375',
        narrator: 'Anas ibn Malik & Ibn Abbas (RA)',
      },
      {
        title: 'Weeping Out of Noble Love in the Sixth Heaven & Reducing Prayers to 5',
        topicTag: 'Beyond Quran · Mi‘raj',
        detail:
          'Musa wept openly after greeting Muhammad ﷺ in the Sixth Heaven—not from jealousy, but grief that a prophet sent after him would lead more followers into Paradise than his own stubborn nation—yet proved the Ummah’s greatest friend by urging Muhammad ﷺ repeatedly to ask Allah for mercy down from 50 daily prayers to 5!',
        source: 'Sahih al-Bukhari 3207, 3398 & 3887',
        narrator: 'Anas & Malik ibn Sa‘sa‘ah (RA)',
      },
    ],
    lifeStages: [
      {
        stageNumber: 1,
        phaseTitle: '1. Basket on the Nile, Pharaoh’s Palace & Exile to Madyan',
        where: 'Egypt → Madyan',
        whatHappened:
          'Floating in a woven chest on the Nile directly into the hands of Pharaoh’s believing queen Asiyah, Musa was miraculously returned to his own mother to nurse! Years later, defending an oppressed Israelite accidentally slew an Egyptian taskmaster, forcing flight across the desert to Madyan.',
        howItUnfolded:
          'Helping two modest sisters water their flock at Madyan’s well, Musa worked eight or ten years tending sheep for their elderly father and married one of them—keeping complete chastity and honesty.',
        revelation: {
          surahNumber: 28,
          ayahNumber: 7,
          ayahRangeLabel: 'Surah Al-Qasas 28:7–28',
          contextEnglish: 'Infancy on the Nile, palace upbringing, accidental manslaughter, and Madyan years.',
        },
        sahihHadith: {
          source: 'Sahih al-Bukhari 2262',
          narrator: 'Abu Hurayrah (RA)',
          textEnglish:
            'The Prophet ﷺ confirmed every prophet worked humbly: Musa contracted himself for eight or ten years of shepherding to guard his chastity and earn his household’s bread cleanly.',
        },
      },
      {
        stageNumber: 2,
        phaseTitle: '2. Sacred Valley of Tuwa, Confrontation with Pharaoh & Exodus War-Chase',
        where: 'Mount Tur (Sinai) → Pharaoh’s Court → Red Sea',
        whatHappened:
          'Seeking fire on a cold night near Sinai, Allah spoke directly to Musa from the blessed bush, transforming his staff into a serpent and ordering him with brother Harun to confront Pharaoh.',
        howItUnfolded:
          'Pharaoh’s magicians fell instantly in prostration recognizing divine truth rather than sorcery! After nine clear plagues, Pharaoh pursued the fleeing Israelites with an entire chariot army to the sea—where Allah split the Red Sea into twelve dry highways for Musa while drowning Pharaoh on the Day of Ashura (10 Muharram).',
        warOrConfrontation: {
          cause: 'Tyrant Pharaoh enslaving Bani Isra’il and attempting genocide at the shore of the Red Sea.',
          commanders: 'Musa & Harun (AS) leading 600,000+ Israelites vs. Pharaoh & Haman commanding Egypt’s chariot host.',
          forces: 'Unarmed escaping nation vs. fully armored royal chariot army.',
          howItUnfolded:
            'Pinning Bani Isra’il against the waves, Musa calmed panic declaring "Indeed with me is my Lord; He will guide me." Striking the water with his staff parted twelve dry corridors; once believers crossed safely, the walls of water crashed back over Pharaoh’s army.',
          outcomeAndLesson:
            'Complete deliverance commemorating divine victory—celebrated forever by the Ashura fast.',
        },
        revelation: {
          surahNumber: 26,
          ayahNumber: 61,
          ayahRangeLabel: 'Surah Ash-Shu‘ara 26:61–67 & Taha 20:9–79',
          contextEnglish: 'Parting of the sea, magicians’ repentance, and drowning of Pharaoh.',
        },
        sahihHadith: {
          source: 'Sahih al-Bukhari 2004 & Sahih Muslim 1130',
          narrator: 'Ibn Abbas (RA)',
          textEnglish:
            'Arriving in Madinah and finding fasting on the Day of Ashura, the Prophet ﷺ learned it marked the exact day Allah saved Musa and Bani Isra’il and drowned Pharaoh, declaring: "We have more right to Musa than they!"—and fasted it.',
        },
      },
      {
        stageNumber: 3,
        phaseTitle: '3. Tablets of Sinai, Golden Calf & Journey with Al-Khidr (AS)',
        where: 'Mount Sinai → Majma‘ al-Bahrayn (Junction of the Two Seas)',
        whatHappened:
          'Receiving the Torah over forty nights, Musa returned to find Samiri had misled many into worshipping a golden calf—prompting repentance and forty years of wandering after refusing to enter the Holy Land. During that era, Musa journeyed to study divine hidden wisdom with Al-Khidr.',
        howItUnfolded:
          'With young Yusha‘ ibn Nun, Musa found Al-Khidr and witnessed three baffling acts—scuttling a poor boat, slaying a wicked youth, and rebuilding a wall for free—learning humility before Allah’s comprehensive wisdom.',
        sahihHadith: {
          source: 'Sahih al-Bukhari 122, 3400 & 4725',
          narrator: 'Ubayy ibn Ka‘b & Ibn Abbas (RA)',
          textEnglish:
            'Comprehensive narration detailing how Musa proclaimed himself the most knowledgeable on earth until Allah informed him of Al-Khidr at Majma‘ al-Bahrayn, the salted fish springing back to sea, a sparrow drinking a drop illustrating how tiny their combined knowledge was compared to Allah’s, and the three lessons.',
        },
      },
      {
        stageNumber: 4,
        phaseTitle: '4. Passing Near the Sacred Land & Role in the Sixth Heaven',
        where: 'Kathib al-Ahmar (near Jerusalem) → Sixth Heaven',
        whatHappened:
          'When the Angel of Death appeared to Musa as a stranger, Musa struck him in fierce self-defense; returning gently, the Angel offered to extend his life by the number of ox-hairs under his palm—yet Musa chose immediate return if only granted death close to the Sacred Land.',
        howItUnfolded:
          'In the Sixth Heaven during Al-Isra wal-Mi‘raj, Musa wept generously knowing Muhammad’s ﷺ Ummah would outnumber his own in Paradise, yet immediately gave Muhammad ﷺ practical counsel to beg Allah to reduce daily prayers from fifty to five!',
        sahihHadith: {
          source: 'Sahih al-Bukhari 1339, 3407 & 3398',
          narrator: 'Abu Hurayrah & Anas (RA)',
          textEnglish:
            'The Prophet ﷺ narrated Musa’s encounter with the Angel of Death and said: "If I were there, I would show you his grave beside the road at the Red Sandhill (Kathib al-Ahmar)." And in Bukhari 3398, Musa advised lightening the prayers from 50 to 5.',
        },
      },
    ],
    revelations: [
      {
        surahNumber: 20,
        ayahNumber: 9,
        ayahRangeLabel: 'Surah Taha 20:9–98 & Al-Kahf 18:60–82',
        contextEnglish: 'Revelation at Tuwa, Pharaoh’s challenge, and journey with Al-Khidr.',
      },
    ],
    sahihHadiths: [
      {
        source: 'Sahih al-Bukhari 122 & 4725',
        narrator: 'Ibn Abbas & Ubayy ibn Ka‘b (RA)',
        textEnglish: 'Complete authentic narration of Musa seeking wisdom with Al-Khidr.',
      },
      {
        source: 'Sahih al-Bukhari 1339 & 3407',
        narrator: 'Abu Hurayrah (RA)',
        textEnglish: 'Passing of Musa at Kathib al-Ahmar within a stone’s throw of Jerusalem.',
      },
    ],
  },
  {
    id: 'prophet-15-harun',
    order: 15,
    nameEnglish: 'Harun (AS)',
    title: 'Prophet-Partner & Guardian of Community Unity',
    lineageAndBirth: 'Elder brother of Musa (AS) by three years; Tribe of Levi',
    eraAndLocation: 'Egypt → Mount Sinai → Wilderness',
    peopleAndRegion: 'Pharaoh’s court & Children of Israel',
    missionSpanOrAge: 'Passed in the wilderness shortly before Musa (AS)',
    scriptureOrMiracle: 'Appointed prophet directly in response to his younger brother Musa’s prayer',
    passingAndBurialTradition: 'Stationed in the Fifth Heaven where Prophet Muhammad ﷺ met and greeted him during Mi‘raj (Bukhari 3207).',
    physicalAppearance: 'Distinguished elder witnessed in the Fifth Heaven surrounded by Israelites, wearing a beard half jet-black and half silver-white, striking and handsome (Sahih al-Bukhari 3207).',
    keyTrials: 'Preventing civil slaughter among 600,000 Israelites during the Golden Calf crisis while waiting 40 days for Musa.',
    hadithExclusiveFacts: [
      {
        title: 'Standard Model of Prophetic Deputyship & Appearance in Fifth Heaven',
        topicTag: 'Beyond Quran · Mi‘raj & Sirah',
        detail:
          'Unmentioned in the Quran’s physical detail: Harun (AS) welcomed Muhammad ﷺ from the Fifth Heaven flanked by believers of his people, and Prophet Muhammad ﷺ explicitly honored Harun’s trusted deputyship to establish Ali ibn Abi Talib’s (RA) role guarding Madinah at Tabuk.',
        source: 'Sahih al-Bukhari 3207 & 4416',
        narrator: 'Anas & Sa‘d ibn Abi Waqqas (RA)',
      },
    ],
    lifeStages: [
      {
        stageNumber: 1,
        phaseTitle: '1. Appointed Co-Messenger & Champion of Eloquence',
        where: 'Egypt & Sinai',
        whatHappened:
          'When Musa worried over his past speech impediment, he prayed: "And appoint for me an assistant from my family—Harun, my brother. Increase my strength through him." Allah answered instantly, granting Harun prophethood before they stood before Pharaoh.',
        howItUnfolded:
          'When Musa ascended Mount Sinai for forty nights, he entrusted the entire nation to Harun. Faced with As-Samiri’s Golden Calf rebellion, Harun warned them calmly rather than splitting the community into lethal civil war until Musa returned.',
        revelation: {
          surahNumber: 20,
          ayahNumber: 29,
          ayahRangeLabel: 'Surah Taha 20:29–36 & 20:90–94',
          contextEnglish: 'Musa’s prayer for Harun and Harun’s wise defense prioritizing community preservation.',
        },
        sahihHadith: {
          source: 'Sahih al-Bukhari 3207 & 4416',
          narrator: 'Anas & Sa‘d ibn Abi Waqqas (RA)',
          textEnglish:
            'Muhammad ﷺ described seeing Harun in the Fifth Heaven surrounded by Israelites with half his beard dark and half silver-white, "handsome to behold." And he honored Ali (RA) comparing his deputy role in Madinah to Harun’s deputyship under Musa.',
        },
      },
    ],
    revelations: [
      {
        surahNumber: 20,
        ayahNumber: 94,
        ayahRangeLabel: 'Surah Taha 20:90–94',
        contextEnglish: 'Harun’s warning against the Golden Calf and patience.',
      },
    ],
    sahihHadiths: [
      {
        source: 'Sahih al-Bukhari 3207 & 4416',
        narrator: 'Anas & Sa‘d (RA)',
        textEnglish: 'Harun’s appearance in the Fifth Heaven and deputyship model praised by the Prophet ﷺ.',
      },
    ],
  },
  {
    id: 'prophet-16-dhulkifl',
    order: 16,
    nameEnglish: 'Dhul-Kifl (AS)',
    title: 'Prophet of Steadfast Patience & Righteousness',
    lineageAndBirth: 'Noble Israelite prophet (identified by classic commentators with Ezekiel or a successor to Al-Yasa‘)',
    eraAndLocation: 'Levant / Ancient Israelite Period',
    peopleAndRegion: 'Children of Israel / Levant',
    missionSpanOrAge: 'Not specified in Sahih Hadith',
    scriptureOrMiracle: 'Quranic testimony to extraordinary patience, truthfulness, and inclusion among "The Best" (Al-Akhyar)',
    passingAndBurialTradition: 'Details of passing rest with Allah; no fabricated or weak tales are included.',
    keyTrials: 'Remaining unfailingly patient and gentle despite relentless demands upon his justice.',
    hadithExclusiveFacts: [
      {
        title: 'Strict Adherence to Verified Sources Over Unverified Legends',
        topicTag: 'Hadith Authentication Discipline',
        detail:
          'Prophet Muhammad ﷺ advised caution regarding unverified Israelite lore ("neither affirm nor deny what is unverified"). Because no specific Sahih Hadith chain elaborates beyond Q 21:85 & 38:48 regarding Dhul-Kifl, Islamic scholarship honors his title strictly upon Quranic certainty.',
        source: 'Sahih al-Bukhari 4485 & 7362 (Authentication Principle)',
        narrator: 'Abu Hurayrah (RA)',
      },
    ],
    lifeStages: [
      {
        stageNumber: 1,
        phaseTitle: '1. Quranic Testimony to Patience & Righteous Honor',
        where: 'Levant',
        whatHappened:
          'Allah honors Dhul-Kifl (AS) twice in the Noble Quran alongside Isma‘il and Idris—affirming he was among the steadfastly patient (As-Sabirin), the righteous (As-Salihin), and the chosen elite (Al-Akhyar).',
        howItUnfolded:
          'Note on authenticity: While later storytelling books contain colorful legends about how he earned the name "Possessor of the Double Guarantee," no specific Sahih Hadith from Bukhari or Muslim details those anecdotes; therefore we rely strictly on what the Quran affirms.',
        revelation: {
          surahNumber: 21,
          ayahNumber: 85,
          ayahRangeLabel: 'Surah Al-Anbiya 21:85–86 & Sad 38:48',
          contextEnglish: 'Numbers Dhul-Kifl among those admitted into special divine mercy for exemplary patience.',
        },
      },
    ],
    revelations: [
      {
        surahNumber: 38,
        ayahNumber: 48,
        ayahRangeLabel: 'Surah Sad 38:48',
        contextEnglish: 'Affirms Dhul-Kifl among the chosen elite of Allah.',
      },
    ],
    sahihHadiths: [],
  },
  {
    id: 'prophet-17-dawud',
    order: 17,
    nameEnglish: 'Dawud (AS)',
    title: 'Prophet-King · Recipient of the Zabur (Psalms)',
    lineageAndBirth: 'Son of Yisha (Jesse), Tribe of Judah; shepherd boy before kingship',
    eraAndLocation: 'Bethlehem & Jerusalem (~1000 BCE)',
    peopleAndRegion: 'Kingdom of Israel',
    missionSpanOrAge: 'Prophet-King who reigned 40 years; gifted 40 years of lifespan by Adam (AS) per Sahih Tirmidhi 3076',
    scriptureOrMiracle: 'The Zabur; iron molded like soft wax in his bare hands; mountains & birds singing Tasbih with him',
    passingAndBurialTradition: 'Completed worship and craftsmanship cleanly after appointing Sulayman (AS) heir.',
    keyTrials: 'Defeating giant Jalut in youth; judging thorny legal disputes swiftly; weeping repentance in private worship.',
    hadithExclusiveFacts: [
      {
        title: 'Finishing the Entire Zabur While His Horse Was Being Saddled',
        topicTag: 'Beyond Quran · Miracle',
        detail:
          'Not recorded in the Quran: reciting the Zabur was made so effortlessly swift and melodious for Dawud (AS) that he would order his mount saddled and finish chanting the scripture completely before the straps were fastened.',
        source: 'Sahih al-Bukhari 3417 & 4713',
        narrator: 'Abu Hurayrah (RA)',
      },
      {
        title: 'Exact Night Worship & Alternate-Day Fasting Schedule',
        topicTag: 'Beyond Quran · Devotion',
        detail:
          'Prophet Muhammad ﷺ declared the worship most beloved to Allah is Dawud’s exact rhythm: fasting every alternate day without breaking, and sleeping half the night, standing in prayer a third of the night, then sleeping the remaining sixth before Fajr.',
        source: 'Sahih al-Bukhari 1131 & 3420',
        narrator: 'Abdullah ibn Amr (RA)',
      },
      {
        title: 'Eating Strictly From Iron Armor Woven by His Own Hands',
        topicTag: 'Beyond Quran · Integrity',
        detail:
          'Though king over a wealthy realm, Dawud (AS) refused to eat anything bought from state revenue—earning all his household’s bread by weaving and selling iron chainmail with his own hands.',
        source: 'Sahih al-Bukhari 2072',
        narrator: 'Al-Miqdam ibn Ma‘dikarib (RA)',
      },
    ],
    lifeStages: [
      {
        stageNumber: 1,
        phaseTitle: '1. Shepherd Youth & Slaying Giant Jalut (Goliath) Under King Talut',
        where: 'Valley between Israelite & Amalekite/Philistine Hosts (Palestine)',
        whatHappened:
          'As a young soldier in King Talut’s outnumbered believing army after passing the river-drinking discipline test, Dawud stepped forward when veterans froze before towering armored Jalut.',
        howItUnfolded:
          'Refusing heavy armor, Dawud felled Jalut with three smooth stones from a sling—routing the terrifying invading host immediately and earning leadership, wisdom, and later unified kingship.',
        warOrConfrontation: {
          cause: 'Invasion attempting to crush the surviving faithful tribes of Bani Isra’il after centuries of oppression.',
          commanders: 'Believers: King Talut & young champion Dawud (AS) · Opponents: Giant warrior Jalut.',
          forces: 'Small faithful remnant tested by thirst ("How many a small company has overcome a mighty army by Allah’s permission!") vs. massive iron-clad army.',
          howItUnfolded:
            'Dawud accepted Jalut’s duel challenge, felled him between the eyes with a sling stone, shattering the invaders’ morale without protracted slaughter.',
          outcomeAndLesson:
            'Proved forever Q 2:249: victory flows from faith, discipline, and trust in Allah—not numbers.',
        },
        revelation: {
          surahNumber: 2,
          ayahNumber: 249,
          ayahRangeLabel: 'Surah Al-Baqarah 2:249–251',
          contextEnglish: 'River test under Talut, victory prayer for steadfastness, and Dawud slaying Jalut.',
        },
      },
      {
        stageNumber: 2,
        phaseTitle: '2. Softened Iron, Armored Craft & Swift Psalms',
        where: 'Jerusalem Royal Court & Forge',
        whatHappened:
          'Allah bestowed the Zabur upon Dawud alongside unmatched vocal beauty—when he glorified Allah, hills and soaring birds echoed in unison—and softened iron in his hands like dough so he forged chainmail.',
        howItUnfolded:
          'Despite holding royal power, Dawud refused to live off royal taxes—eating strictly from armor he wove with his own hands—and completed reciting the entire Zabur in the brief moments while his saddle was strapped.',
        revelation: {
          surahNumber: 34,
          ayahNumber: 10,
          ayahRangeLabel: 'Surah Saba 34:10–11 & Sad 38:17–25',
          contextEnglish: 'Gift of softened iron, mountain echoes, and the night dispute teaching instant repentance.',
        },
        sahihHadith: {
          source: 'Sahih al-Bukhari 2072, 3417 & 1131',
          narrator: 'Al-Miqdam, Abu Hurayrah & Abdullah ibn Amr (RA)',
          textEnglish:
            'The Prophet ﷺ praised Dawud in three Sahih Bukhari reports: (1) "No one ever ate food better than that earned by his own hand; Dawud ate from the earnings of his hand." (2) "Recitation of the Zabur was made so light for Dawud that he finished reciting it before his riding animal could be saddled." (3) "Most beloved to Allah is Dawud’s prayer—he slept half the night, stood praying a third, and slept a sixth—and he fasted every alternate day."',
        },
      },
    ],
    revelations: [
      {
        surahNumber: 2,
        ayahNumber: 251,
        ayahRangeLabel: 'Surah Al-Baqarah 2:251 & Saba 34:10–11',
        contextEnglish: 'Victory over Jalut, softened iron, and kingship of wisdom.',
      },
    ],
    sahihHadiths: [
      {
        source: 'Sahih al-Bukhari 1131 & 2072',
        narrator: 'Abdullah ibn Amr & Al-Miqdam (RA)',
        textEnglish: 'Balanced alternate-day fasting, night prayer rhythm, and humble hand-crafted livelihood.',
      },
      {
        source: 'Sahih al-Bukhari 3417',
        narrator: 'Abu Hurayrah (RA)',
        textEnglish: 'Miraculous fluency in chanting the Zabur.',
      },
    ],
  },
  {
    id: 'prophet-18-sulayman',
    order: 18,
    nameEnglish: 'Sulayman (AS)',
    title: 'Prophet-King · Ruler Over Winds, Jinn & Speech of Creatures',
    lineageAndBirth: 'Son of Prophet-King Dawud (AS)',
    eraAndLocation: 'Jerusalem & Kingdom of Saba (Yemen)',
    peopleAndRegion: 'Kingdom of Israel & Queen Bilqis of Saba',
    missionSpanOrAge: 'Reigned ~40 years after Dawud; passed standing quietly upon his staff overseeing construction (Q 34:14)',
    scriptureOrMiracle: 'Command of winds (morning travel = 1 month), Jinn builders & divers, language of birds & ants',
    passingAndBurialTradition: 'Remained leaning upon his staff until a tiny termite gnawed it down—teaching Jinn that none knows the Unseen except Allah.',
    keyTrials: 'Wielding unmatched global sovereignty without arrogance; inspecting justice down to the smallest ant.',
    hadithExclusiveFacts: [
      {
        title: 'Adjudicating Two Mothers & The Wolf Over One Surviving Infant',
        topicTag: 'Beyond Quran · Judicial Wisdom',
        detail:
          'Completely outside the Quran: when a wolf carried off the child of one of two women, both claimed the surviving infant. Dawud awarded the child to the elder, so young Sulayman called for a knife to split the baby in two—instantly revealing the true mother who cried out sacrificing her claim just to spare the child’s life!',
        source: 'Sahih al-Bukhari 3427 & 6769',
        narrator: 'Abu Hurayrah (RA)',
      },
      {
        title: 'Prophetic Lesson of Never Forgetting "In sha Allah"',
        topicTag: 'Beyond Quran · Spiritual Counsel',
        detail:
          'Sulayman once vowed to visit his wives in one night hoping each would bear a righteous warrior for Allah—forgetting to say "In sha Allah." Consequently only one half-formed child was born, prompting Muhammad ﷺ to teach: "Had he said In sha Allah, his oath would not have failed!"',
        source: 'Sahih al-Bukhari 3424 & 5242',
        narrator: 'Abu Hurayrah (RA)',
      },
      {
        title: 'Why Muhammad ﷺ Released a Capture-Bound Jinn Out of Honor for Sulayman',
        topicTag: 'Beyond Quran · Mosque Incident',
        detail:
          'When a fierce Ifrit Jinn attacked Muhammad ﷺ during night Salah, he seized and strangled it—nearly tying it to a mosque pillar until morning—before recalling his brother Sulayman’s exclusive prayer ("grant me a kingdom none after me will hold") and letting it go in respect.',
        source: 'Sahih al-Bukhari 461 & 3423',
        narrator: 'Abu Hurayrah (RA)',
      },
      {
        title: 'Three Petitions After Completing Bayt al-Maqdis',
        topicTag: 'Beyond Quran · Jerusalem Mosque',
        detail:
          'Upon completing construction of Masjid al-Aqsa, Sulayman asked Allah for three gifts: sound judgment aligning with His decree, an unmatched kingdom, and that anyone traveling purely to pray inside this Masjid exits stripped of sins like the day their mother bore them! The Prophet ﷺ hoped Allah granted the third for this Ummah too.',
        source: 'Sunan an-Nasa’i 693 & Ibn Majah 1408 (Sahih)',
        narrator: 'Abdullah ibn Amr (RA)',
      },
    ],
    lifeStages: [
      {
        stageNumber: 1,
        phaseTitle: '1. Childhood Judicial Wisdom & Inheriting Prophetic Kingship',
        where: 'Jerusalem',
        whatHappened:
          'Even in his father Dawud’s lifetime, young Sulayman showed astonishing insight—both in judging vineyard compensation and famously adjudicating two mothers claiming one surviving baby after a wolf seized the other.',
        howItUnfolded:
          'When Dawud awarded the infant to the older woman, Sulayman asked for a knife to divide the child in two—instantly causing the true mother to scream "No! Give him to her, he is hers!" proving motherhood immediately.',
        revelation: {
          surahNumber: 21,
          ayahNumber: 78,
          ayahRangeLabel: 'Surah Al-Anbiya 21:78–82',
          contextEnglish: 'Praise of both Dawud and Sulayman’s judicial understanding and wind mastery.',
        },
        sahihHadith: {
          source: 'Sahih al-Bukhari 3427 & 3424',
          narrator: 'Abu Hurayrah (RA)',
          textEnglish:
            'Authentic Sahih Bukhari report of the two mothers and the wolf, where Sulayman’s proposed knife uncovered the real mother’s mercy—and Bukhari 3424 reminding believers always to say "In sha Allah" from Sulayman’s lesson.',
        },
      },
      {
        stageNumber: 2,
        phaseTitle: '2. Valley of the Ants, Hoopoe & Invitation to Queen Bilqis of Saba',
        where: 'Valley of Ants → Kingdom of Sheba (Yemen) → Jerusalem',
        whatHappened:
          'Leading armies of humans, Jinn, and birds, Sulayman overheard an ant warning its colony inside the Valley of Ants and smiled in gratitude. Learning from a missing hoopoe bird that Queen Bilqis worshipped the sun in Yemen, he sent a brief, dignified letter opening with "Bismillahir-Rahmanir-Rahim."',
        howItUnfolded:
          'Rejecting her gold bribes firmly while preferring peaceful submission, he miraculously teleported her throne from Yemen to Jerusalem in the blink of an eye—leading Queen Bilqis to declare: "I submit with Sulayman to Allah, Lord of the worlds!"',
        revelation: {
          surahNumber: 27,
          ayahNumber: 15,
          ayahRangeLabel: 'Surah An-Naml 27:15–44',
          contextEnglish: 'The ant’s warning, hoopoe report, Bismillah letter, and conversion of Queen Bilqis.',
        },
        sahihHadith: {
          source: 'Sahih al-Bukhari 3423 & 4610',
          narrator: 'Abu Hurayrah (RA)',
          textEnglish:
            'Prophet Muhammad ﷺ recounted Sulayman’s prayer: "My Lord, grant me a kingdom such as will not belong to anyone after me,"—which was why Muhammad ﷺ once caught an attacking Jinn during night prayer intending to tie him to a mosque pillar, then released him honoring his brother Sulayman’s unique prayer!',
        },
      },
      {
        stageNumber: 3,
        phaseTitle: '3. Passing Upon His Staff While Overseeing Baitul-Maqdis',
        where: 'Royal Sanctuary, Jerusalem',
        whatHappened:
          'Allah decreed Sulayman’s passing silently while he stood leaning upon his staff watching Jinn laborers complete tasks. Only when an earth-creature slowly ate through his wooden staff and he toppled did the Jinn realize he had passed long before—proving they held zero knowledge of the Unseen.',
        howItUnfolded:
          'Notice how the Quran turns even Sulayman’s death into an eternal correction of superstition and fortune-telling.',
        revelation: {
          surahNumber: 34,
          ayahNumber: 14,
          ayahRangeLabel: 'Surah Saba 34:14',
          contextEnglish: 'Exact Quranic account of his quiet passing upon the staff.',
        },
      },
    ],
    revelations: [
      {
        surahNumber: 27,
        ayahNumber: 15,
        ayahRangeLabel: 'Surah An-Naml 27:15–44 & Saba 34:12–14',
        contextEnglish: 'Ants, Queen of Sheba, wind/jinn service, and passing.',
      },
    ],
    sahihHadiths: [
      {
        source: 'Sahih al-Bukhari 3427 & 4610',
        narrator: 'Abu Hurayrah (RA)',
        textEnglish: 'Judicial test of the two mothers and Sulayman’s exclusive dominion respected by Prophet Muhammad ﷺ.',
      },
    ],
  },
  {
    id: 'prophet-19-ilyas',
    order: 19,
    nameEnglish: 'Ilyas (AS)',
    title: 'Fearless Challenger of Ba‘l Idolatry',
    lineageAndBirth: 'Israelite prophet sent to the Northern Kingdom (~9th century BCE)',
    eraAndLocation: 'Baalbek / Northern Kingdom of Israel',
    peopleAndRegion: 'Israelites tempted into state worship of the idol Ba‘l',
    missionSpanOrAge: 'Detailed timeline beyond Quranic praise is not recorded in Sahih Hadith',
    scriptureOrMiracle: 'Unyielding defense of Tawhid under royal hostility; honored with eternal praise across generations',
    passingAndBurialTradition: 'Not detailed in Sahih Hadith (narrations claiming he remains immortal on earth are classified unauthentic/fabricated by Ibn Kathir & Al-Bukhari scholars).',
    keyTrials: 'Confronting king and society after abandoning the Creator for the Phoenician deity Ba‘l.',
    hadithExclusiveFacts: [
      {
        title: 'Warning Against Unauthenticated Legends of Immortality',
        topicTag: 'Sahih Prophetic Principle',
        detail:
          'Sahih Hadith scholarship (grounded in Q 21:34 and Sahih al-Bukhari) clarifies that claims of Ilyas living physically forever in deserts come from unverified tales rather than Sahih Sunnah—honoring Ilyas instead through his immortal Quranic salutation "Salamun ala Ilyasin."',
        source: 'Quran 21:34 & Sahih al-Bukhari 4485 Principle',
        narrator: 'Abu Hurayrah (RA)',
      },
    ],
    lifeStages: [
      {
        stageNumber: 1,
        phaseTitle: '1. Public Confrontation Against the Idol Ba‘l',
        where: 'Northern Israel / Levant',
        whatHappened:
          'Sent when rulers and populace abandoned pure monotheism for Ba‘l, Ilyas challenged them straight to the heart: "Will you fear Allah? Do you invoke Ba‘l and forsake the Best of Creators—Allah, your Lord and Lord of your fathers?"',
        howItUnfolded:
          'Though rejected by his generation, Allah preserved his honored memory across all later nations: "Peace be upon Ilyasin!" Note on authenticity: Sahih Hadith collections explicitly reject popular myths claiming Ilyas or Khidr still roam earth immortally (Quran 21:34).',
        revelation: {
          surahNumber: 37,
          ayahNumber: 123,
          ayahRangeLabel: 'Surah As-Saffat 37:123–132',
          contextEnglish: 'Confrontation over Ba‘l and Allah’s eternal salutation upon Ilyas.',
        },
      },
    ],
    revelations: [
      {
        surahNumber: 37,
        ayahNumber: 123,
        ayahRangeLabel: 'Surah As-Saffat 37:123–132',
        contextEnglish: 'Quranic tribute to Ilyas’s clear call.',
      },
    ],
    sahihHadiths: [],
  },
  {
    id: 'prophet-20-alyasa',
    order: 20,
    nameEnglish: 'Al-Yasa‘ (AS)',
    title: 'Prophetic Successor to Ilyas (AS)',
    lineageAndBirth: 'Righteous prophet from among Bani Isra’il',
    eraAndLocation: 'Northern Kingdom of Israel / Levant',
    peopleAndRegion: 'Children of Israel after Ilyas (AS)',
    missionSpanOrAge: 'Not fixed in Sahih Hadith',
    scriptureOrMiracle: 'Sustained Torah revival and honored twice among Allah’s favored elite',
    passingAndBurialTradition: 'Passed cleanly leaving his nation guided during his lifetime; specifics rest with Allah.',
    keyTrials: 'Maintaining faith amidst recurring idolatrous backsliding.',
    hadithExclusiveFacts: [
      {
        title: 'Included Among All Prophets as "Paternal Brothers Upon One Din"',
        topicTag: 'Sahih Unity Principle',
        detail:
          'Though no separate Hadith story expands Al-Yasa‘s deeds beyond the Quran’s dual praise, Prophet Muhammad ﷺ affirmed the absolute brotherhood and shared creed of every Messenger sent across history.',
        source: 'Sahih al-Bukhari 3443',
        narrator: 'Abu Hurayrah (RA)',
      },
    ],
    lifeStages: [
      {
        stageNumber: 1,
        phaseTitle: '1. Sustaining Monotheism & Honored Among the Chosen',
        where: 'Levant',
        whatHappened:
          'Named twice in the Quran alongside Isma‘il, Yunus, Lut, and Dhul-Kifl, Allah declares: "Each of them We preferred above all the worlds," and "Indeed they are in Our sight among the chosen best (Al-Akhyar)."',
        howItUnfolded:
          'Classical exegetes note he continued Ilyas’s faithful guidance of Bani Isra’il. Because Sahih Hadith collections preserve no separate anecdotal narration, only Quranic truth is presented.',
        revelation: {
          surahNumber: 6,
          ayahNumber: 86,
          ayahRangeLabel: 'Surah Al-An‘am 6:86 & Sad 38:48',
          contextEnglish: 'Elevates Al-Yasa‘ among the prophets favored above all nations.',
        },
      },
    ],
    revelations: [
      {
        surahNumber: 6,
        ayahNumber: 86,
        ayahRangeLabel: 'Surah Al-An‘am 6:86',
        contextEnglish: 'Honors Al-Yasa‘ directly.',
      },
    ],
    sahihHadiths: [],
  },
  {
    id: 'prophet-21-yunus',
    order: 21,
    nameEnglish: 'Yunus (AS)',
    title: 'Dhu al-Nun · Prophet of Nineveh & Answered Repentance',
    lineageAndBirth: 'Yunus ibn Matta (Jonah, son of Matta — confirmed explicitly in Bukhari 3414)',
    eraAndLocation: 'Nineveh (Mosul, Iraq) & the Sea',
    peopleAndRegion: 'More than 100,000 inhabitants of Nineveh',
    missionSpanOrAge: 'Returned to live serenely with his redeemed city after emerging from the whale',
    scriptureOrMiracle: 'Kept alive inside a great whale beneath three layers of darkness; entire city of 100,000+ spared through collective repentance',
    passingAndBurialTradition: 'Returned to shepherd his believing city peacefully ("We let them enjoy life for a time," Q 37:148).',
    physicalAppearance: 'Witnessed during Al-Isra clad in a coarse woolen jubbah riding a ruddy camel down a valley loudly proclaiming Talbiyah (Sahih Muslim 166).',
    keyTrials: 'Exhaustion and departing before divine permission; swallowing by the whale in stormy darkness.',
    hadithExclusiveFacts: [
      {
        title: '"None Should Say I Am Better Than Yunus ibn Matta"',
        topicTag: 'Beyond Quran · Prophetic Humility',
        detail:
          'Twice in Sahih al-Bukhari the Messenger of Allah ﷺ rebuked boasting comparisons among prophets—declaring modestly: "It is not fitting for any servant to say, I am better than Yunus ibn Matta!" safeguarding Yunus’s immense honor despite his brief moment of trial inside the fish.',
        source: 'Sahih al-Bukhari 3414 & 4603',
        narrator: 'Abu Hurayrah & Ibn Abbas (RA)',
      },
      {
        title: 'Witnessed Performing Hajj Talbiyah Across Eternity',
        topicTag: 'Beyond Quran · Unseen Vision',
        detail:
          'During Al-Isra wal-Mi‘raj, passing Wadi al-Azraq (then Wadi Harsha), Prophet Muhammad ﷺ looked down and heard Yunus ibn Matta chanting "Labbayk Allahumma Labbayk" clad in two woolen wraps atop a red she-camel.',
        source: 'Sahih Muslim 166',
        narrator: 'Ibn Abbas (RA)',
      },
      {
        title: 'Guaranteed Relief Through Dhu al-Nun’s Supplication',
        topicTag: 'Beyond Quran · Du‘a Promise',
        detail:
          'No Muslim in distress ever invokes Allah using Yunus’s underwater supplication ("La ilaha illa Anta Subhanaka inni kuntu minaz-zalimin") except that Allah answers their call.',
        source: 'Jami‘ at-Tirmidhi 3505 (Sahih)',
        narrator: 'Sa‘d ibn Abi Waqqas (RA)',
      },
    ],
    lifeStages: [
      {
        stageNumber: 1,
        phaseTitle: '1. Mission to Nineveh, Stormy Sea & Belly of the Great Whale',
        where: 'Nineveh (Iraq) → Stormy Sea',
        whatHappened:
          'Sent to 100,000+ residents of Nineveh, Yunus warned tirelessly until frustration led him to depart before Allah’s explicit leave, boarding an overloaded ship. When violent storms struck, lots were drawn three times—falling each time upon Yunus—and he cast himself into the sea where a giant fish swallowed him without crushing a bone.',
        howItUnfolded:
          'In the pitch darkness of night, deep sea, and the whale’s belly, Yunus turned wholly to Allah: "La ilaha illa Anta Subhanaka inni kuntu minaz-zalimin!"—whereupon Allah commanded the fish to cast him onto a barren shore beneath a broad healing gourd plant.',
        revelation: {
          surahNumber: 21,
          ayahNumber: 87,
          ayahRangeLabel: 'Surah Al-Anbiya 21:87–88 & As-Saffat 37:139–148',
          contextEnglish: 'His cry in three darknesses, healing gourd plant (Yaqtin), and return to 100,000+ believers.',
        },
        sahihHadith: {
          source: 'Jami‘ at-Tirmidhi 3505 (Sahih) & Sahih al-Bukhari 3414',
          narrator: 'Sa‘d ibn Abi Waqqas & Ibn Abbas (RA)',
          textEnglish:
            'The Prophet ﷺ promised: "The supplication of Dhu al-Nun in the belly of the whale—La ilaha illa Anta Subhanaka inni kuntu minaz-zalimin—no Muslim ever invokes Allah with it regarding any distress except that Allah answers him!" And in Bukhari 3414 he taught humility: "No servant should say, I am better than Yunus ibn Matta!"',
        },
      },
      {
        stageNumber: 2,
        phaseTitle: '2. Return to the Only Saved Nation in History',
        where: 'Nineveh, Mesopotamia',
        whatHappened:
          'Meanwhile in Nineveh, seeing the dark cloud of punishment descend just after Yunus left, all 100,000+ residents wept in sincere repentance before torment landed—so Allah lifted the punishment completely, making them the only entire city spared on time!',
        howItUnfolded:
          'Restored to health, Yunus returned and guided that vast penitent community happily for years to come.',
        revelation: {
          surahNumber: 10,
          ayahNumber: 98,
          ayahRangeLabel: 'Surah Yunus 10:98',
          contextEnglish: 'Testifies uniquely to the people of Yunus believing just in time and having disgraceful punishment lifted.',
        },
      },
    ],
    revelations: [
      {
        surahNumber: 37,
        ayahNumber: 139,
        ayahRangeLabel: 'Surah As-Saffat 37:139–148',
        contextEnglish: 'Full chronology of ship lots, fish, gourd tree, and 100,000+ believers.',
      },
    ],
    sahihHadiths: [
      {
        source: 'Sahih al-Bukhari 3414 & 4603',
        narrator: 'Abu Hurayrah & Ibn Abbas (RA)',
        textEnglish: 'Forbidding believers from belittling Yunus ibn Matta’s prophetic honor.',
      },
      {
        source: 'Jami‘ at-Tirmidhi 3505 (Sahih)',
        narrator: 'Sa‘d ibn Abi Waqqas (RA)',
        textEnglish: 'Guaranteed response to Yunus’s supplication of Tawhid and repentance.',
      },
    ],
  },
  {
    id: 'prophet-22-zakariyya',
    order: 22,
    nameEnglish: 'Zakariyya (AS)',
    title: 'Guardian of Maryam (AS) & Master Carpenter',
    lineageAndBirth: 'Senior priest & prophet among the descendants of Harun/Dawud',
    eraAndLocation: 'Jerusalem (Bayt al-Maqdis), 1st Century BCE',
    peopleAndRegion: 'Children of Israel in Judea',
    missionSpanOrAge: 'Rejoiced in old age ("my head has flared with white hair") with birth of son Yahya (AS)',
    scriptureOrMiracle: 'Granted heir in barren old age after witnessing out-of-season fruit in Maryam’s sanctuary chamber; three days of silent Tasbih sign',
    passingAndBurialTradition: 'Worked humbly with his hands as a carpenter throughout life (Sahih Muslim 2379); passing details vary outside Sahih chains.',
    keyTrials: 'Fearing moral decay among temple heirs after his lifetime.',
    hadithExclusiveFacts: [
      {
        title: 'Prophet-Carpenter Who Lived by Honest Manual Craft',
        topicTag: 'Beyond Quran · Livelihood',
        detail:
          'Unmentioned in the Quran: while serving Jerusalem’s sacred sanctuary and guarding Maryam (AS), Prophet Zakariyya earned his household’s living as a skilled carpenter (Najjar), setting an eternal example of dignified self-reliance.',
        source: 'Sahih Muslim 2379',
        narrator: 'Abu Hurayrah (RA)',
      },
    ],
    lifeStages: [
      {
        stageNumber: 1,
        phaseTitle: '1. Carpenter’s Dignity, Guardianship of Maryam & Answered Secret Prayer',
        where: 'Al-Masjid al-Aqsa (Jerusalem Sanctuary)',
        whatHappened:
          'Chosen by drawing pens/lots cast in running water to guard orphan Maryam (AS), Zakariyya provided humbly for his household by working as a carpenter. Every time he entered Maryam’s sanctuary chamber, he found summer fruits in winter and winter fruits in summer!',
        howItUnfolded:
          'Moved by Allah’s boundless power, he stepped aside into private prayer fearing what corrupt kinsmen would do to scripture after his death—begging Allah softly for a pure heir. Angels called him right where he stood praying with news of Yahya!',
        revelation: {
          surahNumber: 19,
          ayahNumber: 2,
          ayahRangeLabel: 'Surah Maryam 19:2–11 & Ali ‘Imran 3:37–44',
          contextEnglish: 'Drawing lots for Maryam, miraculous seasonal fruit, and quiet supplication answered.',
        },
        sahihHadith: {
          source: 'Sahih Muslim 2379',
          narrator: 'Abu Hurayrah (RA)',
          textEnglish:
            'The Messenger of Allah ﷺ reminded companions of the dignity of honest manual labor: "Zakariyya (AS) used to be a carpenter (Najjar)!"',
        },
      },
    ],
    revelations: [
      {
        surahNumber: 19,
        ayahNumber: 2,
        ayahRangeLabel: 'Surah Maryam 19:2–11',
        contextEnglish: 'Whispered prayer and miraculous sign of three speechless days except in remembrance.',
      },
    ],
    sahihHadiths: [
      {
        source: 'Sahih Muslim 2379',
        narrator: 'Abu Hurayrah (RA)',
        textEnglish: 'Explicit testimony that Prophet Zakariyya (AS) earned his livelihood as a carpenter.',
      },
    ],
  },
  {
    id: 'prophet-23-yahya',
    order: 23,
    nameEnglish: 'Yahya (AS)',
    title: 'Al-Hasur · Compassionate, Chaste & Preacher of the Five Commands',
    lineageAndBirth: 'Miraculous son of aged Zakariyya (AS); maternal cousin of Isa (AS)',
    eraAndLocation: 'Jerusalem & Jordan River Valley',
    peopleAndRegion: 'Children of Israel',
    missionSpanOrAge: 'Martyred defending Allah’s sacred law against tyrannical corruption',
    scriptureOrMiracle: 'Granted Prophetic wisdom (Hukm) from early boyhood; unique unprecedented name ("Yahya")',
    passingAndBurialTradition: 'Honored in the Second Heaven alongside Isa (AS) when greeted by Muhammad ﷺ during Mi‘raj (Bukhari 3207).',
    physicalAppearance: 'Young, gentle, sin-free prophet greeting Muhammad ﷺ alongside his maternal cousin Isa (AS) in the Second Heaven (Sahih al-Bukhari 3207).',
    keyTrials: 'Uncompromising stand on moral purity before corrupt political elites.',
    hadithExclusiveFacts: [
      {
        title: 'Five Divine Commandments Proclaimed Inside Bayt al-Maqdis',
        topicTag: 'Beyond Quran · Sermon',
        detail:
          'Not detailed in the Quran: Allah commanded Yahya to gather Bani Isra’il in Jerusalem and deliver five monumental words: (1) pure Tawhid like a master’s loyal servant; (2) attentive Salah while Allah faces the worshipper; (3) Fasting more fragrant than musk; (4) Charity rescuing hostages; and (5) Constant Dhikr like a walled citadel protecting from pursuing foes.',
        source: 'Jami‘ at-Tirmidhi 2863 & Musnad Ahmad 17170 (Sahih)',
        narrator: 'Al-Harith al-Ash‘ari (RA)',
      },
    ],
    lifeStages: [
      {
        stageNumber: 1,
        phaseTitle: '1. Childhood Wisdom & Allah’s Five Immortal Commandments',
        where: 'Bayt al-Maqdis (Jerusalem)',
        whatHappened:
          'Commanded as a young boy "O Yahya, take hold of the Scripture with determination," he possessed rare tenderness toward parents, absolute chastity, and unyielding courage—explicitly appointed to deliver Five Divine Commandments to Bani Isra’il.',
        howItUnfolded:
          'Gathering people inside Bayt al-Maqdis, Yahya taught five shields of the soul: (1) pure Tawhid, (2) focused Salah without distraction, (3) Fasting compared to priceless musk before Allah, (4) Charity rescuing captives from the enemy, and (5) Constant Dhikr compared to a man chasing refuge inside a fortified citadel against a pursuing army.',
        revelation: {
          surahNumber: 19,
          ayahNumber: 12,
          ayahRangeLabel: 'Surah Maryam 19:12–15',
          contextEnglish: 'Boyhood wisdom, filial kindness, and peace upon his birth, death, and resurrection.',
        },
        sahihHadith: {
          source: 'Jami‘ at-Tirmidhi 2863 & Musnad Ahmad 17170 (Sahih)',
          narrator: 'Al-Harith al-Ash‘ari (RA)',
          textEnglish:
            'The Prophet ﷺ narrated at length: "Allah commanded Yahya ibn Zakariyya with five words to practice and command Bani Isra’il to practice—monotheism, prayer, fasting (whose fragrance to Allah surpasses musk), charity, and remembering Allah continuously like an impenetrable fortress!"',
        },
      },
      {
        stageNumber: 2,
        phaseTitle: '2. Welcoming Muhammad ﷺ in the Second Heaven',
        where: 'Second Heaven (Al-Isra wal-Mi‘raj)',
        whatHappened:
          'Together with his maternal cousin Isa (AS), Yahya stood in the Second Heaven greeting Prophet Muhammad ﷺ warmly on the Night of Ascent.',
        howItUnfolded:
          'Confirmed forever in authentic Bukhari & Muslim chains.',
        sahihHadith: {
          source: 'Sahih al-Bukhari 3207',
          narrator: 'Malik ibn Sa‘sa‘ah (RA)',
          textEnglish:
            '"In the Second Heaven I met the two maternal cousins, Isa son of Maryam and Yahya son of Zakariyya, who both greeted me saying: Welcome to the pious brother and pious Prophet!"',
        },
      },
    ],
    revelations: [
      {
        surahNumber: 19,
        ayahNumber: 12,
        ayahRangeLabel: 'Surah Maryam 19:12–15',
        contextEnglish: 'Childhood Hukm, compassion, and triple blessing of peace.',
      },
    ],
    sahihHadiths: [
      {
        source: 'Jami‘ at-Tirmidhi 2863 (Sahih)',
        narrator: 'Al-Harith al-Ash‘ari (RA)',
        textEnglish: 'Complete narration of the Five Divine Commandments delivered by Yahya (AS) in Jerusalem.',
      },
      {
        source: 'Sahih al-Bukhari 3207',
        narrator: 'Malik ibn Sa‘sa‘ah (RA)',
        textEnglish: 'Meeting Yahya and Isa together in the Second Heaven during Al-Isra wal-Mi‘raj.',
      },
    ],
  },
  {
    id: 'prophet-24-isa',
    order: 24,
    nameEnglish: 'Isa (AS)',
    title: 'Al-Masih · Word of Allah & Herald of Prophet Ahmad ﷺ',
    lineageAndBirth: 'Miraculous fatherless virgin birth to Maryam bint Imran (AS)',
    eraAndLocation: 'Bethlehem, Nazareth & Jerusalem (Palestine)',
    peopleAndRegion: 'Children of Israel',
    missionSpanOrAge: 'Ministry ~3 years before ascent at ~33; will return near the End of Times to establish 40 years of peace',
    scriptureOrMiracle: 'The Injil; speaking in the cradle; healing the blind & lepers and reviving dead by Allah’s permission',
    passingAndBurialTradition: 'Raised alive cleanly to Allah—never crucified—and will pass peacefully after returning near the Hour and fulfilling Hajj/justice (Sahih Muslim).',
    physicalAppearance: 'Medium height, broad chest, radiant reddish-white complexion ("as if just emerging from a bath — Dimas"), lank sleek hair wet-glistening down to his shoulders (Sahih al-Bukhari 3239, 3437, 3440).',
    keyTrials: 'Slander against his pure mother, betrayal by a treacherous associate, conspiracy of crucifixion foiled by Allah.',
    hadithExclusiveFacts: [
      {
        title: 'Only Maryam & Isa Escaped Shaytan’s Prick at Birth',
        topicTag: 'Beyond Quran · Birth',
        detail:
          'Every newborn cries at birth when Shaytan pokes its side—except Maryam and baby Isa, because Maryam’s mother prayed: "I place her and her offspring under Your protection from outcast Shaytan."',
        source: 'Sahih al-Bukhari 3431 & 4548',
        narrator: 'Abu Hurayrah (RA)',
      },
      {
        title: 'One of Only Three Infants Who Spoke From the Cradle',
        topicTag: 'Beyond Quran · Miracle Pattern',
        detail:
          'Only three babies spoke articulately in infancy across history: Isa ibn Maryam defending his mother, the infant vindicating pious monk Jurayj, and the nursing child warning his mother after seeing a proud tyrant rider.',
        source: 'Sahih al-Bukhari 3436',
        narrator: 'Abu Hurayrah (RA)',
      },
      {
        title: 'Mercy When Catching a Suspected Thief Who Swore by Allah',
        topicTag: 'Beyond Quran · Humility',
        detail:
          'Witnessing a man steal yet swear sincerely "By Allah I did not!", Isa immediately remarked out of reverence for Allah’s Name: "I believe in Allah and belie my own eyes!"',
        source: 'Sahih al-Bukhari 3444',
        narrator: 'Abu Hurayrah (RA)',
      },
      {
        title: 'Detailed End-Times Return, Defeat of Dajjal, Hajj & Burial',
        topicTag: 'Beyond Quran · Future Prophecy',
        detail:
          'Resting his hands upon two angels’ wings, Isa descends at the white minaret east of Damascus wearing two saffron-dyed garments; slays the Dajjal at Bab Ludd; prays for rescue against Ya’juj & Ma’juj; walks through Fajj al-Rawha chanting Talbiyah for Hajj/Umrah; governs with unmatched equity for 40 years; and passes cleanly in Madinah.',
        source: 'Sahih al-Bukhari 3448, Sahih Muslim 1252 & 2937',
        narrator: 'Abu Hurayrah & Al-Nawwas ibn Sam‘an (RA)',
      },
    ],
    lifeStages: [
      {
        stageNumber: 1,
        phaseTitle: '1. Pure Virgin Birth, Satan’s Touch Averted & Cradle Miracle',
        where: 'Bethlehem / Judea',
        whatHappened:
          'Due to Maryam’s mother Hannah praying "I seek refuge in You for her and her offspring from outcast Shaytan," neither Maryam nor baby Isa was touched by Shaytan’s prick at birth. When elders accused Maryam upon carrying the infant home, newborn Isa pointed to and spoke straight from the cradle!',
        howItUnfolded:
          '"Indeed I am the servant of Allah; He has given me the Book and made me a Prophet!"—declaring his pure servitude from his very first sentence on earth.',
        revelation: {
          surahNumber: 19,
          ayahNumber: 29,
          ayahRangeLabel: 'Surah Maryam 19:27–36',
          contextEnglish: 'Maryam’s silent fast, Isa’s clear declaration in the cradle defending his mother and affirming Tawhid.',
        },
        sahihHadith: {
          source: 'Sahih al-Bukhari 3431 & 3436',
          narrator: 'Abu Hurayrah (RA)',
          textEnglish:
            'The Prophet ﷺ taught: "No newborn comes into this world except that Satan touches him at birth causing him to cry out—except Maryam and her son Isa." And in Bukhari 3436, Isa is among only three infants ever to speak miraculously in the cradle.',
        },
      },
      {
        stageNumber: 2,
        phaseTitle: '2. The Injil, Healing Miracles & Prophesying "Ahmad" ﷺ',
        where: 'Towns of Galilee & Jerusalem',
        whatHappened:
          'Traveling gently in humble woolen garments alongside sincere disciples (Al-Hawariyyun), Isa lived a life of extreme detachment from wealth—even smiling mercifully once when witnessing a thief take something out of fear that calling out Allah’s name took precedence over accusation (Bukhari 3444).',
        howItUnfolded:
          'Healing those born blind and leprous and breathing life into clay birds solely by Allah’s leave, he corrected harsh burdens in law and explicitly foretold the final Messenger "whose name is Ahmad."',
        revelation: {
          surahNumber: 61,
          ayahNumber: 6,
          ayahRangeLabel: 'Surah As-Saff 61:6 & Al-Ma’idah 5:110–117',
          contextEnglish: 'Prophecy of Ahmad ﷺ and complete disavowal of any claim to divinity.',
        },
        sahihHadith: {
          source: 'Sahih al-Bukhari 3435 & 3442',
          narrator: 'Ubadah ibn al-Samit & Abu Hurayrah (RA)',
          textEnglish:
            'Ubadah reported the gateway to all eight gates of Paradise includes testifying that "Isa is the servant of Allah, His messenger, and His Word conveyed into Maryam." And the Prophet ﷺ declared: "I am the nearest of all people to Isa son of Mary... Prophets are paternal brothers; their religion is one!"',
        },
      },
      {
        stageNumber: 3,
        phaseTitle: '3. Rescue from Crucifixion, Second Heaven & Prophesied Return',
        where: 'Jerusalem → Raised Alive → Prophesied Descent at Damascus',
        whatHappened:
          'When enemies sought to crucify him, Allah cast his likeness upon another and raised Isa alive to Himself. Currently residing in the Second Heaven (Bukhari 3207), he will descend near the End of Times to defeat the False Messiah (Dajjal).',
        howItUnfolded:
          'Descending upon the white minaret east of Damascus resting hands on two angels’ wings, Isa will break the cross, abolish non-Muslim poll tax as humanity unites under Islam, govern with unmatched fairness, perform Hajj, and pass peacefully before burial.',
        revelation: {
          surahNumber: 4,
          ayahNumber: 157,
          ayahRangeLabel: 'Surah An-Nisa 4:157–158',
          contextEnglish: '"They did not kill him nor crucify him, but it was made to appear so to them; rather Allah raised him to Himself."',
        },
        sahihHadith: {
          source: 'Sahih al-Bukhari 3448 & Sahih Muslim 2937',
          narrator: 'Abu Hurayrah & Al-Nawwas ibn Sam‘an (RA)',
          textEnglish:
            'The Prophet ﷺ promised: "By Him in whose Hand is my soul, surely the son of Mary will soon descend among you as a just judge: he will break the cross, kill swine, abolish jizyah, and wealth will overflow until none accepts charity—one single prostration then will be dearer than the world and all it holds!"',
        },
      },
    ],
    revelations: [
      {
        surahNumber: 19,
        ayahNumber: 30,
        ayahRangeLabel: 'Surah Maryam 19:29–36 & An-Nisa 4:157–158',
        contextEnglish: 'Cradle speech, servanthood, and ascent alive to Allah.',
      },
    ],
    sahihHadiths: [
      {
        source: 'Sahih al-Bukhari 3431, 3442 & 3448',
        narrator: 'Abu Hurayrah (RA)',
        textEnglish: 'Protection at birth, close prophetic kinship with Muhammad ﷺ, and authentic end-times return.',
      },
    ],
  },
  {
    id: 'prophet-25-muhammad',
    order: 25,
    nameEnglish: 'Muhammad ﷺ',
    title: 'Khatam al-Nabiyyin · Mercy to All Worlds',
    lineageAndBirth: 'Muhammad ibn Abdullah ibn Abd al-Muttalib (Banu Hashim, Quraysh); descendant of Isma‘il ibn Ibrahim (AS)',
    eraAndLocation: 'Makkah & Madinah (570 – 632 CE)',
    peopleAndRegion: 'All of Humanity until the Last Day',
    missionSpanOrAge: '63 years (40 years prior to prophethood + 23 years of revelation across Makkah & Madinah)',
    scriptureOrMiracle: 'The Noble Quran (living eternal miracle); Al-Isra wal-Mi‘raj; splitting of the moon; water springing from his fingers',
    passingAndBurialTradition: 'Passed peacefully in Aishah’s (RA) apartment on Monday 12 Rabi al-Awwal 11 AH and was buried beneath the exact spot.',
    physicalAppearance: 'Balanced medium-tall build, luminous fair complexion with rosy glow ("like a sliver of the moon"), wide jet-black eyes, long eyelashes, thick beard, and the Seal of Prophethood between his shoulder blades (Sahih al-Bukhari 3549–3556).',
    keyTrials: 'Orphanhood, 13 years of Makkan torture & boycott, losing Khadijah & children, defending Madinah across major wars.',
    hadithExclusiveFacts: [
      {
        title: 'Five Unique Gifts Bestowed Over Every Earlier Prophet',
        topicTag: 'Beyond Quran · Distinction',
        detail:
          'The Prophet ﷺ summarized his unique honors: (1) Aided with awe across a month’s journey; (2) The entire earth made pure sanctuary for Salah and Tayammum; (3) War spoils made lawful; (4) Granted the Grand Intercession (Al-Shafa‘ah al-Uzma); and (5) Sent universally to every human nation, whereas earlier prophets went strictly to their own people.',
        source: 'Sahih al-Bukhari 335 & 438',
        narrator: 'Jabir ibn Abdullah (RA)',
      },
      {
        title: 'The Grand Cistern (Al-Hawd) & First to Open Paradise’s Gate',
        topicTag: 'Beyond Quran · Hereafter',
        detail:
          'At Al-Hawd—whose water is whiter than milk and sweeter than honey with goblets numerous as stars—he awaits believers before knocking first upon Paradise’s Gate, where Angel Khazin responds: "I was commanded not to open for anyone before you!"',
        source: 'Sahih Muslim 197, 2300 & Sahih al-Bukhari 6581',
        narrator: 'Anas & Abdullah ibn Amr (RA)',
      },
      {
        title: 'Yearning to Meet His "Brothers" From Later Generations',
        topicTag: 'Beyond Quran · Love for Ummah',
        detail:
          'Visiting Baqi‘ cemetery he exclaimed: "How I wish we could see our brothers!" When companions asked if they were his brothers, he smiled: "You are my Companions; my brothers are those who will come after me and believe without ever seeing me!"',
        source: 'Sahih Muslim 249',
        narrator: 'Abu Hurayrah (RA)',
      },
    ],
    lifeStages: [
      {
        stageNumber: 1,
        phaseTitle: '1. Birth, Purification in Youth & 40 Years as Al-Amin (570 – 610 CE)',
        where: 'Makkah & Banu Sa‘d',
        whatHappened:
          'Orphaned before age six, raised by Abd al-Muttalib and Abu Talib, working honestly as a shepherd and merchant—earned universal trust across Makkah as As-Sadiq Al-Amin before marriage to Khadijah (RA) and arbitrating the Black Stone.',
        howItUnfolded:
          'Protected from every Makkan idolatrous custom since boyhood; full chronological study available in the "Sirah & Wars" tab.',
        sahihHadith: {
          source: 'Sahih Muslim 1162 & Sahih al-Bukhari 3535',
          narrator: 'Abu Qatadah & Abu Hurayrah (RA)',
          textEnglish:
            '"I am the final missing brick completing the magnificent house of Prophethood—the Seal of all Prophets."',
        },
      },
      {
        stageNumber: 2,
        phaseTitle: '2. 13 Years of Makkan Da‘wah, Persecution & Al-Isra (610 – 622 CE)',
        where: 'Cave Hira, Makkah, Ta’if & Jerusalem',
        whatHappened:
          'Receiving the Quran via Jibril (AS), he proclaimed Tawhid amidst brutal boycotts, torture of companions, loss of Khadijah and Abu Talib, stoning at Ta’if, and heavenly honor at Al-Isra wal-Mi‘raj.',
        howItUnfolded:
          'Refused vengeance at Ta’if out of hope for future generations before securing the Pledges of Aqabah.',
        revelation: {
          surahNumber: 21,
          ayahNumber: 107,
          ayahRangeLabel: 'Surah Al-Anbiya 21:107 & Al-Isra 17:1',
          contextEnglish: 'Mercy to all creation and nocturnal journey from Makkah to Jerusalem.',
        },
        sahihHadith: {
          source: 'Sahih al-Bukhari 3 & 3231',
          narrator: 'Aishah (RA)',
          textEnglish: 'Cave of Hira revelation and exemplary mercy responding to persecution at Ta’if.',
        },
      },
      {
        stageNumber: 3,
        phaseTitle: '3. Hijrah, Statehood & Major Defensive Wars (1 – 8 AH)',
        where: 'Madinah, Badr, Uhud, Khandaq, Hudaybiyyah, Khaybar & Mu’tah',
        whatHappened:
          'Migrating to Madinah with Abu Bakr (RA), he forged an egalitarian constitution and successfully defended the community against existential coalitions across Badr, Uhud, Trench (Khandaq), Khaybar, and Mu’tah.',
        howItUnfolded:
          'Paired defensive strength with shrewd peacemaking at Hudaybiyyah, opening the hearts of Arabia.',
        warOrConfrontation: {
          cause: 'Stopping recurring Quraysh and confederate invasions aiming to exterminate Madinan Muslims.',
          commanders: 'Prophet Muhammad ﷺ with Hamzah, Ali, Abu Bakr, Umar, Khalid ibn al-Walid, and Sa‘d ibn Mu‘adh (RA).',
          forces: 'Across 8 major campaigns growing from 313 men at Badr to 1,400 at Khaybar and 3,000 at Khandaq/Mu’tah.',
          howItUnfolded:
            'Detailed battle-by-battle breakdowns (Cause, Forces, Commanders, Course & Lessons) are available in full under the "All Important Wars" & "Sirah" tabs.',
          outcomeAndLesson:
            'Permanently ended tribal aggression against Madinah with minimal casualties across all defensive campaigns.',
        },
        sahihHadith: {
          source: 'Sahih Muslim 1763 & Sahih al-Bukhari 4101',
          narrator: 'Umar & Jabir (RA)',
          textEnglish: 'Supplication for survival at Badr and manual solidarity digging the Trench at Khandaq.',
        },
      },
      {
        stageNumber: 4,
        phaseTitle: '4. Bloodless Makkah Victory, Tabuk, Farewell Hajj & Passing (8 – 11 AH)',
        where: 'Makkah, Hunayn, Tabuk & Madinah',
        whatHappened:
          'Entering Makkah with 10,000 companions without revenge, overcoming the Hunayn ambush, marching 30,000 strong to Tabuk, perfecting the religion at Arafat before 100,000+ believers, and passing serenely in Madinah at age 63.',
        howItUnfolded:
          'Leaving behind only his white mule, his armor mortgaged for barley, and a strip of charity land—his entire inheritance to mankind remained the Quran and Sunnah.',
        revelation: {
          surahNumber: 5,
          ayahNumber: 3,
          ayahRangeLabel: 'Surah Al-Ma’idah 5:3 & Al-Ahzab 33:40',
          contextEnglish: 'Completion of Islam at Arafat and Seal of the Prophets.',
        },
        sahihHadith: {
          source: 'Sahih al-Bukhari 4463 & Sahih Muslim 1218',
          narrator: 'Aishah & Jabir (RA)',
          textEnglish: 'Farewell Sermon at Arafat and his peaceful final words: "With the Highest Companion!"',
        },
      },
    ],
    revelations: [
      {
        surahNumber: 33,
        ayahNumber: 40,
        ayahRangeLabel: 'Surah Al-Ahzab 33:40 & Al-Anbiya 21:107',
        contextEnglish: 'Seal of all Prophets and universal Mercy to the Worlds.',
      },
    ],
    sahihHadiths: [
      {
        source: 'Sahih al-Bukhari 3535',
        narrator: 'Abu Hurayrah (RA)',
        textEnglish: 'Parable of the final brick completing the House of Prophethood.',
      },
      {
        source: 'Sahih al-Bukhari 4463',
        narrator: 'Aishah (RA)',
        textEnglish: 'Peaceful passing in Aishah’s chamber calling out "Bal ar-Rafiq al-A‘la."',
      },
    ],
  },
  {
    id: 'prophet-26-yusha',
    order: 26,
    nameEnglish: 'Yusha‘ ibn Nun (Joshua, AS)',
    title: 'Prophet After Musa · The Only Human for Whom the Sun Was Halted',
    isHadithOnlyProphet: true,
    lineageAndBirth: 'Yusha‘ ibn Nun ibn Afrayim ibn Yusuf (AS); devoted young attendant of Prophet Musa (AS) before inheriting prophetic leadership of Bani Isra’il',
    eraAndLocation: 'Sinai Wilderness → Jericho & Sacred Land (Bayt al-Maqdis)',
    peopleAndRegion: 'New generation of Children of Israel entering the Promised Land after the 40-year wilderness',
    missionSpanOrAge: 'Led the triumphant entry into the Holy Land following Musa and Harun (AS)',
    scriptureOrMiracle: 'Allah literally paused the setting sun in the sky so Yusha‘ could complete conquest before Shabbat',
    passingAndBurialTradition: 'Guided Bani Isra’il faithfully in justice and monotheism upon establishing them in Palestine.',
    keyTrials: 'Leading a scarred wilderness nation, confronting fortified Canaanite citadels, purifying ranks from secret war-booty theft.',
    hadithExclusiveFacts: [
      {
        title: 'Sole Human in History for Whom Allah Stopped the Sun',
        topicTag: 'Hadith-Only Prophet · Cosmic Miracle',
        detail:
          'Nowhere in the Quran is this cosmic miracle or Yusha‘s name explicitly written—rather, Sahih al-Bukhari and Sahih Muslim preserve the Prophet’s ﷺ awe-inspiring testimony: "The sun was never stopped for any human being except Yusha‘ during the evenings when he marched toward Bayt al-Maqdis!"',
        source: 'Sahih al-Bukhari 3124 & Sahih Muslim 1747',
        narrator: 'Abu Hurayrah (RA)',
      },
      {
        title: 'Commanding Soldiers Pure in Intention & Halting Sunset Prayer',
        topicTag: 'Beyond Quran · Leadership & Sunnah',
        detail:
          'Before marching, Yusha‘ forbade three types from joining battle—newlyweds, half-built homeowners, and pregnant-flock owners—so every fighter’s heart was focused wholly. When Asr approached outside Jericho right before sunset, he addressed the sun: "You are under command and I am under command; O Allah, hold it back for us!" and the sun froze until victory.',
        source: 'Sahih al-Bukhari 3124 & Sahih Muslim 1747',
        narrator: 'Abu Hurayrah (RA)',
      },
      {
        title: 'Accompanying Musa (AS) on the Journey to Al-Khidr',
        topicTag: 'Quran Link (Q 18:60 Named via Sahih Hadith)',
        detail:
          'While Surah Al-Kahf refers only to "Musa’s young attendant (Fatahu)" carrying the salted fish that sprang back to life in the sea, Sahih al-Bukhari 122 explicitly names that loyal youth as Prophet Yusha‘ ibn Nun (AS).',
        source: 'Sahih al-Bukhari 122 & 4725',
        narrator: 'Ibn Abbas & Ubayy ibn Ka‘b (RA)',
      },
    ],
    lifeStages: [
      {
        stageNumber: 1,
        phaseTitle: '1. Loyal Disciple of Musa & Witness of the Living Fish Miracle',
        where: 'Wandering Era → Majma‘ al-Bahrayn (Junction of Two Seas)',
        whatHappened:
          'Young Yusha‘ carried a basket containing a salted fish beside Musa (AS) searching for Allah’s knowledgeable servant Al-Khidr. Resting beside a rock spring of life, the dead salted fish flopped upright and tunneled back into the sea!',
        howItUnfolded:
          'Satan made Yusha‘ forget mentioning the miracle until Musa noticed fatigue later; retracing steps back to that exact rock brought them straight to Al-Khidr.',
        revelation: {
          surahNumber: 18,
          ayahNumber: 60,
          ayahRangeLabel: 'Surah Al-Kahf 18:60–65 (Named in Bukhari)',
          contextEnglish: 'Mentions Musa’s faithful young servant—explicitly identified as Yusha‘ ibn Nun in Sahih al-Bukhari.',
        },
        sahihHadith: {
          source: 'Sahih al-Bukhari 122 & 4725',
          narrator: 'Ibn Abbas & Ubayy ibn Ka‘b (RA)',
          textEnglish: 'Identifies Musa’s companion "Fatahu" explicitly as Yusha‘ ibn Nun.',
        },
      },
      {
        stageNumber: 2,
        phaseTitle: '2. Stopping the Setting Sun & Liberation of the Holy Land',
        where: 'Jericho & Approaches to Bayt al-Maqdis',
        whatHappened:
          'Appointed prophet after Musa’s passing, Yusha‘ mobilized the new unafraid generation of Israelites, prayed aloud to halt the descending Friday afternoon sun so battle would finish cleanly before Sabbath sunset, and captured the walled city.',
        howItUnfolded:
          'When lawful spoils remained untouched waiting for heavenly fire to accept them (before spoils were later made lawful for Muhammad’s ﷺ Ummah), heavenly fire refused to descend until a secret thief repented and returned a single cow’s-head lump of gold!',
        warOrConfrontation: {
          cause: 'Liberating the Sacred Land after forty years of wilderness purification following Bani Isra’il’s prior refusal.',
          commanders: 'Prophet Yusha‘ ibn Nun (AS) commanding the disciplined new generation of Israel.',
          forces: 'Hand-picked focused army free of domestic distractions fighting walled Canaanite fortifications.',
          howItUnfolded:
            'Closing in on victory late Friday evening, Yusha‘ raised his eyes skyward addressing the sun by Allah’s command; Allah suspended sunset until the city walls fell and spoils were gathered cleanly.',
          outcomeAndLesson:
            'Taught sacred discipline: hidden greed (ghulul) blocks divine acceptance even on the verge of victory, whereas sincere courage invokes cosmic miracles.',
        },
        sahihHadith: {
          source: 'Sahih al-Bukhari 3124 & Sahih Muslim 1747',
          narrator: 'Abu Hurayrah (RA)',
          textEnglish:
            'The Prophet ﷺ narrated the full campaign of the Prophet [Yusha‘] who prayed for the sun to be detained until victory was sealed, and how heavenly fire exposed a hidden gold cow-head theft among the spoils.',
        },
      },
    ],
    revelations: [
      {
        surahNumber: 18,
        ayahNumber: 60,
        ayahRangeLabel: 'Surah Al-Kahf 18:60–64',
        contextEnglish: 'Contextual Quranic verse mentioning Yusha‘ anonymously as Musa’s loyal companion.',
      },
    ],
    sahihHadiths: [
      {
        source: 'Sahih al-Bukhari 3124 & Sahih Muslim 1747',
        narrator: 'Abu Hurayrah (RA)',
        textEnglish: 'Sole authentic record of the sun halting in mid-sky for Prophet Yusha‘ ibn Nun (AS).',
      },
    ],
  },
  {
    id: 'prophet-27-alkhidr',
    order: 27,
    nameEnglish: 'Al-Khidr (AS)',
    title: 'Prophet / Servant of Hidden Mercy (‘Ilm Ladunni)',
    isHadithOnlyProphet: true,
    lineageAndBirth: 'Named expressly "Al-Khidr" (The Green One) in Sahih al-Bukhari; revered by majority scholars (including Ibn Hajar & Al-Qurtubi) as a Prophet gifted direct revelation of Allah’s merciful wisdom',
    eraAndLocation: 'Majma‘ al-Bahrayn (Junction of the Two Seas) · Era of Musa (AS)',
    peopleAndRegion: 'Travelers, poor boatmen & orphans along coastal seas',
    missionSpanOrAge: 'Passed in his appointed earthly span before the Prophethood of Muhammad ﷺ (Quran 21:34 & Sahih Muslim 2537)',
    scriptureOrMiracle: 'Barren white earth turning lush green wherever he sat (Bukhari 3402); direct divine foresight into unseen outcomes',
    passingAndBurialTradition: 'Classical Hadith masters (Al-Bukhari, Ibn al-Jawzi, Ibn Kathir) verify from Muslim 2537 & Q 21:34 that every prophet and human prior to Islam passed before the Last Hour’s century.',
    keyTrials: 'Carrying out heartbreaking external decrees—scuttling a boat, removing a wicked future oppressor, guarding an orphan treasure—under strict divine command.',
    hadithExclusiveFacts: [
      {
        title: 'Why He Was Named "Al-Khidr" (The Green One)',
        topicTag: 'Hadith-Only Prophet · Origin of Name',
        detail:
          'Never named "Al-Khidr" in the Quran (which calls him solely "One of Our Servants"). Sahih al-Bukhari explicitly teaches: "He was called Al-Khidr because he sat upon a barren white piece of land (farwah), and suddenly it quivered beneath him turning lush green!"',
        source: 'Sahih al-Bukhari 3402',
        narrator: 'Abu Hurayrah (RA)',
      },
      {
        title: 'Sparrow Sipping One Drop Comparing Human Knowledge to Allah’s',
        topicTag: 'Beyond Quran · Boat Parable',
        detail:
          'While sailing aboard the small wooden ship, a tiny sparrow perched on the boat’s edge and dipped its beak once into the ocean. Al-Khidr turned to Musa explaining: "O Musa, my knowledge and your knowledge do not diminish Allah’s knowledge even as much as this sparrow took from the sea!"',
        source: 'Sahih al-Bukhari 122 & 4725',
        narrator: 'Ibn Abbas & Ubayy ibn Ka‘b (RA)',
      },
      {
        title: 'Note on Authenticity: Why Tales of His Enduring Immortality Are Rejected',
        topicTag: 'Sahih Hadith Verification',
        detail:
          'Despite popular folklore, Prophet Muhammad ﷺ stated plainly a month before passing: "Not a single soul alive on the face of the earth today will remain after 100 years" (Sahih Muslim 2537). Authentic scholars cite this alongside Q 21:34 to confirm Al-Khidr passed cleanly in his era.',
        source: 'Sahih Muslim 2537 & Sahih al-Bukhari 116',
        narrator: 'Abdullah ibn Umar & Jabir (RA)',
      },
    ],
    lifeStages: [
      {
        stageNumber: 1,
        phaseTitle: '1. Seated Upon Green Cushion at Junction of Two Seas',
        where: 'Coastal Rock at Majma‘ al-Bahrayn',
        whatHappened:
          'Covering himself gently in a garment upon green coastal grass overlooking the sea, Al-Khidr was greeted by Musa ibn Imran with "As-Salamu alaykum." Surprised anyone knew greeting-of-peace in that remote land, Al-Khidr recognized Allah’s Prophet Musa.',
        howItUnfolded:
          'Al-Khidr warned openly: "O Musa, I possess knowledge from Allah you do not know, and you possess knowledge from Allah I do not know"—setting one firm rule of silent patience until Al-Khidr himself explained.',
        revelation: {
          surahNumber: 18,
          ayahNumber: 65,
          ayahRangeLabel: 'Surah Al-Kahf 18:65–70',
          contextEnglish: 'Musa meets Allah’s servant and agrees to test patience.',
        },
        sahihHadith: {
          source: 'Sahih al-Bukhari 122, 3400 & 4725',
          narrator: 'Ubayy ibn Ka‘b & Ibn Abbas (RA)',
          textEnglish: 'Complete verbatim dialogue between Musa and Al-Khidr on the shore and aboard the ship.',
        },
      },
      {
        stageNumber: 2,
        phaseTitle: '2. Three Baffling Acts Unveiled as Pure Divine Mercy',
        where: 'Sea Voyage → Village → Orphan Town',
        whatHappened:
          'Al-Khidr (1) pulled a plank out of poor boatmen’s ferry; (2) slew an arrogant youth whose rebellion threatened his pious parents’ faith; and (3) rebuilt a crumbling wall in an inhospitable town without asking wages—prompting Musa to object three times.',
        howItUnfolded:
          'Parting ways kindly, Al-Khidr unveiled the unseen wisdom: a tyrant king ahead was seizing every undamaged ship, Allah replaced the wicked son with a pure daughter/child, and righteous orphans owned treasure buried beneath that wall. "I did none of it of my own accord!"',
        revelation: {
          surahNumber: 18,
          ayahNumber: 71,
          ayahRangeLabel: 'Surah Al-Kahf 18:71–82',
          contextEnglish: 'Explanation of the damaged boat, the lost boy, and the orphans’ wall.',
        },
        sahihHadith: {
          source: 'Sahih al-Bukhari 4725',
          narrator: 'Ubayy ibn Ka‘b (RA)',
          textEnglish:
            'Muhammad ﷺ commented tenderly: "We wished Musa had been patient a little longer so Allah would have narrated even more wonders between the two of them!"',
        },
      },
    ],
    revelations: [
      {
        surahNumber: 18,
        ayahNumber: 65,
        ayahRangeLabel: 'Surah Al-Kahf 18:65–82',
        contextEnglish: 'Complete Quranic account of Musa learning humility alongside Al-Khidr.',
      },
    ],
    sahihHadiths: [
      {
        source: 'Sahih al-Bukhari 3402 & 4725',
        narrator: 'Abu Hurayrah & Ubayy ibn Ka‘b (RA)',
        textEnglish: 'Origin of the name "Al-Khidr" and full explanation of the sparrow’s drop parable.',
      },
    ],
  },
  {
    id: 'prophet-28-sahih-unnamed-prophets',
    order: 28,
    nameEnglish: 'Additional Prophets & The 124,000 Messengers',
    title: 'True Prophetic Accounts Documented Exclusively in Sahih Hadiths',
    isHadithOnlyProphet: true,
    lineageAndBirth: 'Allah sent messengers to every single human nation across history (Q 16:36), though only 25 names appear inside the Noble Quran',
    eraAndLocation: 'Across All Generations & Nations Prior to Muhammad ﷺ',
    peopleAndRegion: 'Every ancient tribe and settlement on Earth',
    missionSpanOrAge: '124,000 Prophets (among them 315 Messengers) sent before the Seal of Prophets ﷺ',
    scriptureOrMiracle: 'Countless miracles of perseverance, prayer, mercy & Resurrection rankings confirmed in Sahih Sunnah',
    passingAndBurialTradition: 'Some prophets lived decades with loyal nations; others were martyred or died peacefully with only one, two, or zero followers.',
    keyTrials: 'Extreme loneliness—standing before entire stubborn generations even when only two souls or none responded.',
    hadithExclusiveFacts: [
      {
        title: 'Total Count: 124,000 Prophets & 315 Messengers',
        topicTag: 'Hadith-Only Record · Prophetic Scale',
        detail:
          'When Abu Dharr (RA) asked how many prophets Allah dispatched, the Prophet ﷺ taught: "One hundred and twenty-four thousand (124,000) Prophets, and among them three hundred and fifteen (315) Messengers (Rusul)—a vast multitude!"',
        source: 'Musnad Ahmad 22288 & Sahih Ibn Hibban 361 (Graded Sahih)',
        narrator: 'Abu Dharr al-Ghifari (RA)',
      },
      {
        title: 'The Wounded Prophet Who Wiped Blood Praying Forgiveness for His Nation',
        topicTag: 'Hadith-Only Prophet · Forgiveness',
        detail:
          'Ibn Mas‘ud (RA) recalled watching the Prophet ﷺ recount a prior prophet beaten bloody by his own townspeople: wiping blood down his cheeks, that prophet prayed gently: "Allahummaghfir li-qawmi fa-innahum la ya‘lamun — O Allah, forgive my people, for they do not know!"—the very prayer Muhammad ﷺ echoed at Uhud!',
        source: 'Sahih al-Bukhari 3477 & Sahih Muslim 1792',
        narrator: 'Abdullah ibn Mas‘ud (RA)',
      },
      {
        title: 'The Prophet Rebuked Over Burning an Ant Colony',
        topicTag: 'Hadith-Only Prophet · Animal Mercy',
        detail:
          'A prophet once sat beneath a tree and was stung by an ant. Ordering all his belongings removed, he set fire to the ant mound. Allah immediately revealed a gentle rebuke: "Just because a single ant stung you, you destroyed an entire community (ummah) that glorifies Me?!"',
        source: 'Sahih al-Bukhari 3019, 3319 & Sahih Muslim 2241',
        narrator: 'Abu Hurayrah (RA)',
      },
      {
        title: 'Prophets Arriving on Judgment Day With Only 1, 2, or Zero Followers',
        topicTag: 'Hadith-Only Insight · Success Standard',
        detail:
          'Prophet Muhammad ﷺ was shown the nations gathered on Judgment Day: a prophet passing accompanied by an entire multitude, a prophet with only a small band, a prophet trailing just one or two believers—and a sincere prophet walking wholly alone without a single follower!',
        source: 'Sahih al-Bukhari 5752 & Sahih Muslim 220',
        narrator: 'Ibn Abbas (RA)',
      },
    ],
    lifeStages: [
      {
        stageNumber: 1,
        phaseTitle: '1. 124,000 Sent Across Every Nation — Truth Stands Beyond Numbers',
        where: 'Global Nations Across Human History',
        whatHappened:
          'Sahih Hadith lifts the veil beyond the 25 named Quranic prophets, reminding believers that true prophetic success rests purely in conveying Allah’s message—even if an entire city beats a prophet or zero listeners accept in his lifetime.',
        howItUnfolded:
          'From prophets forgiving their attackers while bleeding, to being corrected for harming an ant nest, these authentic narrations preserve unforgettable moral lessons straight from the lips of Muhammad ﷺ.',
        sahihHadith: {
          source: 'Sahih al-Bukhari 3477 & 5752',
          narrator: 'Ibn Mas‘ud & Ibn Abbas (RA)',
          textEnglish: 'A wounded prophet praying forgiveness for his people, and Judgment Day showing prophets with zero followers.',
        },
      },
    ],
    revelations: [
      {
        surahNumber: 40,
        ayahNumber: 78,
        ayahRangeLabel: 'Surah Ghafir 40:78 & An-Nisa 4:164',
        contextEnglish: '"Of some Messengers We have already told you, and of some Messengers We have NOT told you their stories."',
      },
    ],
    sahihHadiths: [
      {
        source: 'Sahih al-Bukhari 3019, 3477 & 5752',
        narrator: 'Abu Hurayrah, Ibn Mas‘ud & Ibn Abbas (RA)',
        textEnglish: 'Three immortal Sahih Bukhari accounts detailing unnamed earlier prophets outside the Quran.',
      },
    ],
  },
];
