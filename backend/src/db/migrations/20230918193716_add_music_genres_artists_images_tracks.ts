import { type Knex } from 'knex';

const Tables = {
  TRACKS_TABLE_NAME: 'tracks',
  FILES_TABLE_NAME: 'files',
  IMAGES_TABLE_NAME: 'images',
  ARTISTS_TABLE_NAME: 'artists',
  GENRES_TABLE_NAME: 'genres',
};

const AUDIO_CONTENT_TYPE = 'audio/mpeg';

const FILES_AUDIO = [
  {
    url: 'https://sound-vault-bucket.s3.eu-north-1.amazonaws.com/basic_music/505.mp3',
    contentType: AUDIO_CONTENT_TYPE,
  },
  {
    url: 'https://sound-vault-bucket.s3.eu-north-1.amazonaws.com/basic_music/august.mp3',
    contentType: AUDIO_CONTENT_TYPE,
  },
  {
    url: 'https://sound-vault-bucket.s3.eu-north-1.amazonaws.com/basic_music/blank_space.mp3',
    contentType: AUDIO_CONTENT_TYPE,
  },
  {
    url: 'https://sound-vault-bucket.s3.eu-north-1.amazonaws.com/basic_music/borderline.mp3',
    contentType: AUDIO_CONTENT_TYPE,
  },
  {
    url: 'https://sound-vault-bucket.s3.eu-north-1.amazonaws.com/basic_music/cruel_summer.mp3',
    contentType: AUDIO_CONTENT_TYPE,
  },
  {
    url: 'https://sound-vault-bucket.s3.eu-north-1.amazonaws.com/basic_music/dont_blame_me.mp3',
    contentType: AUDIO_CONTENT_TYPE,
  },
  {
    url: 'https://sound-vault-bucket.s3.eu-north-1.amazonaws.com/basic_music/i_wanna_be_yours.mp3',
    contentType: AUDIO_CONTENT_TYPE,
  },
  {
    url: 'https://sound-vault-bucket.s3.eu-north-1.amazonaws.com/basic_music/just_wanna_rock.mp3',
    contentType: AUDIO_CONTENT_TYPE,
  },
  {
    url: 'https://sound-vault-bucket.s3.eu-north-1.amazonaws.com/basic_music/les.mp3',
    contentType: AUDIO_CONTENT_TYPE,
  },
  {
    url: 'https://sound-vault-bucket.s3.eu-north-1.amazonaws.com/basic_music/let_it_happen.mp3',
    contentType: AUDIO_CONTENT_TYPE,
  },
  {
    url: 'https://sound-vault-bucket.s3.eu-north-1.amazonaws.com/basic_music/redbone.mp3',
    contentType: AUDIO_CONTENT_TYPE,
  },
  {
    url: 'https://sound-vault-bucket.s3.eu-north-1.amazonaws.com/basic_music/the_less_i_know_the_better.mp3',
    contentType: AUDIO_CONTENT_TYPE,
  },
];

const FOLKLORE_FILES_AUDIO = [
  {
    url: 'https://sound-vault-bucket.s3.eu-north-1.amazonaws.com/basic_music/celtic_cliffs-of-moher.mp3',
    contentType: AUDIO_CONTENT_TYPE,
  },
  {
    url: 'https://sound-vault-bucket.s3.eu-north-1.amazonaws.com/basic_music/celtic_handmaiden.mp3',
    contentType: AUDIO_CONTENT_TYPE,
  },
  {
    url: 'https://sound-vault-bucket.s3.eu-north-1.amazonaws.com/basic_music/german_die-lore-ley.mp3',
    contentType: AUDIO_CONTENT_TYPE,
  },
  {
    url: 'https://sound-vault-bucket.s3.eu-north-1.amazonaws.com/basic_music/indonesian_langgam-jawa.mp3',
    contentType: AUDIO_CONTENT_TYPE,
  },
  {
    url: 'https://sound-vault-bucket.s3.eu-north-1.amazonaws.com/basic_music/mexican_tampico-cumbia.mp3',
    contentType: AUDIO_CONTENT_TYPE,
  },
  {
    url: 'https://sound-vault-bucket.s3.eu-north-1.amazonaws.com/basic_music/scottish_farewell-to-tarwathie.mp3',
    contentType: AUDIO_CONTENT_TYPE,
  },
  {
    url: 'https://sound-vault-bucket.s3.eu-north-1.amazonaws.com/basic_music/scottish_wild-mountain-thyme.mp3',
    contentType: AUDIO_CONTENT_TYPE,
  },
  {
    url: 'https://sound-vault-bucket.s3.eu-north-1.amazonaws.com/basic_music/spanish_alma-corazon-y-vida.mp3',
    contentType: AUDIO_CONTENT_TYPE,
  },
  {
    url: 'https://sound-vault-bucket.s3.eu-north-1.amazonaws.com/basic_music/ukrainian_moonlight-night.mp3',
    contentType: AUDIO_CONTENT_TYPE,
  },
  {
    url: 'https://sound-vault-bucket.s3.eu-north-1.amazonaws.com/basic_music/ukrainian_oh-there-on-a-mountain.mp3',
    contentType: AUDIO_CONTENT_TYPE,
  },
];

const FILES = [
  {
    url: 'https://sound-vault-bucket.s3.eu-north-1.amazonaws.com/basic_images/david-becker-crs2vlkSe98-unsplash.jpg',
    contentType: 'image/jpg',
  },
  {
    url: 'https://sound-vault-bucket.s3.eu-north-1.amazonaws.com/basic_images/daniel-olah-OlTjeydUpQw-unsplash.jpg',
    contentType: 'image/jpg',
  },
  {
    url: 'https://sound-vault-bucket.s3.eu-north-1.amazonaws.com/basic_images/eberhard-grossgasteiger-xC7Ho08RYF4-unsplash.jpg',
    contentType: 'image/jpg',
  },
  {
    url: 'https://sound-vault-bucket.s3.eu-north-1.amazonaws.com/basic_images/mymind-tZCrFpSNiIQ-unsplash.jpg',
    contentType: 'image/jpg',
  },
  {
    url: 'https://sound-vault-bucket.s3.eu-north-1.amazonaws.com/basic_images/mymind-XUlsF9LYeVk-unsplash.jpg',
    contentType: 'image/jpg',
  },
  {
    url: 'https://sound-vault-bucket.s3.eu-north-1.amazonaws.com/basic_images/pawel-czerwinski-6lQDFGOB1iw-unsplash.jpg',
    contentType: 'image/jpg',
  },
  {
    url: 'https://sound-vault-bucket.s3.eu-north-1.amazonaws.com/basic_images/pawel-czerwinski-Lki74Jj7H-U-unsplash.jpg',
    contentType: 'image/jpg',
  },
  {
    url: 'https://sound-vault-bucket.s3.eu-north-1.amazonaws.com/basic_images/rene-bohmer-YeUVDKZWSZ4-unsplash.jpg',
    contentType: 'image/jpg',
  },
  {
    url: 'https://sound-vault-bucket.s3.eu-north-1.amazonaws.com/basic_images/ricardo-gomez-angel-UD5drKd4H6w-unsplash.jpg',
    contentType: 'image/jpg',
  },
  {
    url: 'https://sound-vault-bucket.s3.eu-north-1.amazonaws.com/basic_images/usgs-hoS3dzgpHzw-unsplash.jpg',
    contentType: 'image/jpg',
  },
];

const IMAGES: { fileId: number; isBasicImage: boolean }[] = [];

const GENRES: {
  genreName: string;
  genreDescription: string;
  imageId: number;
}[] = [
  {
    genreName: 'Alternative/Indie',
    genreDescription:
      'Alternative/Indie is a genre defined by its non-conformist spirit, blending diverse influences like rock, pop, punk, and folk. Emphasizing artistic expression and authenticity, it encourages experimentation and often features introspective lyrics. Rooted in independence, the genre values a DIY ethos, with artists challenging mainstream norms. From the alternative rock boom of the `80s/`90s to today`s diverse sonic landscapes, Alternative/Indie remains a dynamic and evolving musical realm.',
    imageId: Number(''),
  },
  {
    genreName: 'Electropop',
    genreDescription:
      'Electropop is a genre that fuses elements of electronic music with pop sensibilities, creating catchy and danceable tracks. It emerged in the late 20th century and gained prominence in the 21st century. Electropop features synthesizers, electronic beats, and a polished production style, often incorporating elements of disco, new wave, and synth-pop. The genre`s appeal lies in its infectious hooks, shimmering synths, and a balance between electronic experimentation and mainstream accessibility. Popularized by artists like Lady Gaga, CHVRCHES, and Robyn, electropop continues to evolve, influencing contemporary pop music with its blend of electronic and pop aesthetics.',
    imageId: Number(''),
  },
  {
    genreName: 'Pop',
    genreDescription:
      'Pop music, short for "popular," is a genre known for its mass appeal, catchy melodies, and broad accessibility. It draws from diverse influences, constantly evolving with trends. With a focus on memorable hooks and polished production, pop has shaped the music landscape for decades, spanning from classic icons to contemporary chart-toppers.',
    imageId: Number(''),
  },
  {
    genreName: 'Indie rock',
    genreDescription:
      'Indie rock, short for independent rock, is a genre characterized by its DIY ethos, emphasizing independence from major record labels. Emerging in the 1980s and gaining prominence in the `90s, indie rock is diverse and often features a raw, unpolished sound. Bands associated with the genre typically prioritize artistic expression over commercial success, leading to experimentation with various musical styles. Indie rock can encompass elements of punk, alternative rock, folk, and more. Notable for its underground roots, indie rock has produced iconic acts like The Smiths, Pixies, and Arcade Fire, influencing the broader music landscape with its alternative and independent spirit.',
    imageId: Number(''),
  },
  {
    genreName: 'Hip-Hop/Rap',
    genreDescription:
      'Hip-hop/rap, born in the Bronx in the 1970s, is a dynamic genre rooted in rhythmic speech (rap) and diverse beats. Its cultural impact extends beyond music, influencing fashion and art. From pioneers like Grandmaster Flash to contemporary icons like Kendrick Lamar, hip-hop remains a powerful medium for self-expression and social commentary.',
    imageId: Number(''),
  },
  {
    genreName: 'Psychedelic funk',
    genreDescription:
      'Psychedelic funk blends the rhythmic grooves of funk with the experimental and mind-expanding sounds of psychedelia. Popularized in the late `60s and `70s, it features tight instrumentation, prominent basslines, and often incorporates trippy effects and unconventional instruments. Artists like Parliament-Funkadelic and Sly and the Family Stone are notable contributors, creating a unique and adventurous musical fusion.',
    imageId: Number(''),
  },
];

const FOLKLORE_GENRES: {
  genreName: string;
  genreDescription: string;
  imageId: number;
}[] = [
  {
    genreName: 'Celtic Folklore',
    genreDescription:
      'Celtic musical folklore is the traditional music of Celtic cultures, characterized by instruments like harps and bagpipes. Rooted in cultural tales and celebrations, it forms a distinctive and globally influential musical tradition.',
    imageId: Number(''),
  },
  {
    genreName: 'German Folklore',
    genreDescription:
      'German musical folklore encompasses the traditional music and melodies rooted in German culture. Influenced by regional diversity, it features a variety of instruments such as accordion, alpine horns, and zither. German musical folklore reflects local traditions, storytelling, and festive celebrations, contributing to the rich cultural heritage of the country.',
    imageId: Number(''),
  },
  {
    genreName: 'Indonesian Folklore',
    genreDescription:
      'Indonesian musical folklore represents the traditional music deeply rooted in the diverse cultures of Indonesia. Encompassing a wide array of instruments such as gamelan, sasando, and kendang, this musical tradition is intertwined with local myths, rituals, and historical narratives. Indonesian musical folklore reflects the nation`s cultural richness and is an integral part of celebrations, ceremonies, and everyday life.',
    imageId: Number(''),
  },
  {
    genreName: 'Mexican Folklore',
    genreDescription:
      'Mexican musical folklore encompasses the traditional music and rhythms deeply rooted in Mexico`s diverse cultural heritage. It features iconic instruments like the mariachi`s trumpet and guitar, as well as indigenous instruments like the jarana and marimba. Mexican musical folklore is intertwined with historical events, religious celebrations, and indigenous influences, reflecting the vibrant and dynamic nature of the country`s music.',
    imageId: Number(''),
  },
  {
    genreName: 'Scottish Folklore',
    genreDescription:
      'Scottish musical folklore is a rich tapestry of traditional music and melodies rooted in the cultural heritage of Scotland. It prominently features instruments such as the bagpipes, fiddle, and accordion, creating distinct sounds that reflect the country`s history and landscapes. Scottish musical folklore often accompanies traditional dances like the ceilidh, and its tunes are inspired by local legends, historical events, and the natural beauty of the Scottish countryside.',
    imageId: Number(''),
  },
  {
    genreName: 'Spanish Folklore',
    genreDescription:
      'Spanish musical folklore encompasses the traditional music deeply ingrained in the diverse cultures of Spain. Flamenco, with its expressive guitar, singing, and dance, is particularly iconic. Various regional styles, instruments like the flamenco guitar and castanets, and influences from Arabic and Gypsy traditions contribute to the rich tapestry of Spanish musical folklore. The music is often intertwined with cultural celebrations, religious festivals, and historical narratives, reflecting the vibrancy of Spain`s heritage.',
    imageId: Number(''),
  },
  {
    genreName: 'Ukrainian Folklore',
    genreDescription:
      'Ukrainian musical folklore is a vibrant expression of the country`s rich cultural heritage. It features traditional music characterized by instruments like the bandura, kobza, and accordion. The music often accompanies folk dances such as the Hopak. Ukrainian musical folklore reflects the nation`s history, with themes of love, nature, and Cossack tales. It plays a significant role in cultural celebrations, rituals, and events, contributing to the distinct identity of Ukrainian traditions.',
    imageId: Number(''),
  },
];

const ARTISTS = [
  {
    artistName: 'Arctic Monkeys',
    artistUsername: 'arctic_monkeys',
    description:
      'Indie rock band known for their energetic performances and clever lyrics.',
    imageId: Number(''),
  },
  {
    artistName: 'Taylor Swift',
    artistUsername: 'taylor_swift',
    description:
      'Pop and country singer-songwriter with a massive global fan base.',
    imageId: Number(''),
  },
  {
    artistName: 'Tame Impala',
    artistUsername: 'tame_impala',
    description:
      'Psychedelic music project led by Kevin Parker, blending rock and electronic elements.',
    imageId: Number(''),
  },
  {
    artistName: 'Lil Uzi Vert',
    artistUsername: 'lil_uzi_vert',
    description:
      'Rapper known for his unique style, melodic flow, and energetic performances.',
    imageId: Number(''),
  },
  {
    artistName: 'Childish Gambino',
    artistUsername: 'childish_gambino',
    description:
      'Multi-talented artist, actor, and rapper, known for his diverse musical and creative pursuits.',
    imageId: Number(''),
  },
];

const FOLKLORE_ARTISTS = [
  {
    artistName: 'Elena Harper',
    artistUsername: 'elena_harper',
    description:
      'A folk singer-songwriter with a passion for weaving tales through acoustic melodies.',
    imageId: Number(''),
  },
  {
    artistName: 'Milo Woodcraft',
    artistUsername: 'milo_woodcraft',
    description:
      'An indie folk artist exploring traditional themes with a modern touch.',
    imageId: Number(''),
  },
  {
    artistName: 'Luna Fairchild',
    artistUsername: 'luna_fairchild',
    description:
      'A mystical harpist and vocalist, creating enchanting tunes inspired by folklore.',
    imageId: Number(''),
  },
  {
    artistName: 'Cedric Greenleaf',
    artistUsername: 'cedric_greenleaf',
    description:
      'A folk instrumentalist dedicated to reviving ancient melodies and folk traditions.',
    imageId: Number(''),
  },
  {
    artistName: 'Fiona Ravensong',
    artistUsername: 'fiona_ravensong',
    description:
      'A folk storyteller and singer, capturing the essence of cultural tales in her music.',
    imageId: Number(''),
  },
];

const FOLKLORE_TRACKS = [
  {
    fileId: Number(''),
    title: 'Cliffs Of Moher',
    artistId: 1,
    genreId: 1,
    yearOfPublication: 2017,
    imageId: Number(''),
  },
  {
    fileId: Number(''),
    title: 'Handmaiden',
    artistId: 4,
    genreId: 1,
    yearOfPublication: 2013,
    imageId: Number(''),
  },
  {
    fileId: Number(''),
    title: 'Die Lore Ley',
    artistId: 2,
    genreId: 2,
    yearOfPublication: 2011,
    imageId: Number(''),
  },
  {
    fileId: Number(''),
    title: 'Langgam Jawa',
    artistId: 3,
    genreId: 3,
    yearOfPublication: 2018,
    imageId: Number(''),
  },
  {
    fileId: Number(''),
    title: 'Tampico Cumbia',
    artistId: 4,
    genreId: 4,
    yearOfPublication: 2007,
    imageId: Number(''),
  },
  {
    fileId: Number(''),
    title: 'Farewell To Tarwathie',
    artistId: 5,
    genreId: 5,
    yearOfPublication: 2011,
    imageId: Number(''),
  },
  {
    fileId: Number(''),
    title: 'Wild Mountain Thyme',
    artistId: 2,
    genreId: 5,
    yearOfPublication: '2016',
    imageId: Number(''),
  },
  {
    fileId: Number(''),
    title: 'Alma Corazon Y Vida',
    artistId: 1,
    genreId: 6,
    yearOfPublication: '2016',
    imageId: Number(''),
  },
  {
    fileId: Number(''),
    title: 'Moonlight Night',
    artistId: 3,
    genreId: 7,
    yearOfPublication: '2017',
    imageId: Number(''),
  },
  {
    fileId: Number(''),
    title: 'Oh there on a mountain',
    artistId: 5,
    genreId: 7,
    yearOfPublication: '2019',
    imageId: Number(''),
  },
];

const TRACKS = [
  {
    fileId: Number(''),
    title: '505',
    artistId: 1,
    genreId: 1,
    yearOfPublication: 2007,
    imageId: Number(''),
  },
  {
    fileId: Number(''),
    title: 'I Wanna Be Yours',
    artistId: 1,
    genreId: 1,
    yearOfPublication: 2013,
    imageId: Number(''),
  },
  {
    fileId: Number(''),
    title: 'august',
    artistId: 2,
    genreId: 1,
    yearOfPublication: 2020,
    imageId: Number(''),
  },
  {
    fileId: Number(''),
    title: 'The Less I Know The Better',
    artistId: 3,
    genreId: 1,
    yearOfPublication: 2015,
    imageId: Number(''),
  },
  {
    fileId: Number(''),
    title: 'Borderline',
    artistId: 3,
    genreId: 1,
    yearOfPublication: 2020,
    imageId: Number(''),
  },
  {
    fileId: Number(''),
    title: 'Les',
    artistId: 5,
    genreId: 1,
    yearOfPublication: 2011,
    imageId: Number(''),
  },
  {
    fileId: Number(''),
    title: 'Blank Space',
    artistId: 2,
    genreId: 2,
    yearOfPublication: '2014',
    imageId: Number(''),
  },
  {
    fileId: Number(''),
    title: 'Don`t Blame Me',
    artistId: 2,
    genreId: 2,
    yearOfPublication: '2017',
    imageId: Number(''),
  },
  {
    fileId: Number(''),
    title: 'Cruel Summer',
    artistId: 2,
    genreId: 3,
    yearOfPublication: '2019',
    imageId: Number(''),
  },
  {
    fileId: Number(''),
    title: 'Let It Happen',
    artistId: 3,
    genreId: 4,
    yearOfPublication: '2015',
    imageId: Number(''),
  },
];

const up = async (knex: Knex): Promise<void> => {
  const audioInsertResults: { id: string; url: string }[] = await knex(
    Tables.FILES_TABLE_NAME,
  )
    .insert(FOLKLORE_FILES_AUDIO)
    .returning(['id', 'url']);

  console.log(audioInsertResults);

  const fileInsertResults = await knex(Tables.FILES_TABLE_NAME)
    .insert(FILES)
    .returning('id');

  fileInsertResults.forEach(({ id }: { id: number }) => {
    IMAGES.push({ fileId: Number(id), isBasicImage: true });
  });

  const imagesInsertResults: { id: number }[] = await knex(
    Tables.IMAGES_TABLE_NAME,
  )
    .insert(IMAGES)
    .returning('id');

  const imageIds = imagesInsertResults.map((object: { id: number }) => {
    return object.id;
  });

  FOLKLORE_GENRES.forEach((genre) => {
    genre.imageId = imageIds[
      Math.floor(Math.random() * imageIds.length)
    ] as number;
  });

  const genresInsertResults = await knex(Tables.GENRES_TABLE_NAME)
    .insert(FOLKLORE_GENRES)
    .returning(['id', 'genreName']);

  console.log(genresInsertResults);

  FOLKLORE_ARTISTS.forEach((artist) => {
    artist.imageId = imageIds[
      Math.floor(Math.random() * imageIds.length)
    ] as number;
  });

  const artistsInsertResults = await knex(Tables.ARTISTS_TABLE_NAME)
    .insert(FOLKLORE_ARTISTS)
    .returning(['id', 'artistName']);

  console.log(artistsInsertResults);

  FOLKLORE_TRACKS.forEach((track) => {
    const file = audioInsertResults.find((audio) => {
      return (
        // track.title.toLowerCase().replaceAll('`', '').replaceAll(' ', '_') +
        //   '.mp3' ===
        // audio.url.split('/')[4]
        track.title.toLowerCase().replaceAll('`', '').replaceAll(' ', '-') +
          '.mp3' ===
        audio.url.split('/')[4]?.split('_')[1]
      );
    });

    track.fileId = Number(file?.id);
    track.imageId = imageIds[
      Math.floor(Math.random() * imageIds.length)
    ] as number;
  });

  console.log(FOLKLORE_TRACKS);

  await knex(Tables.TRACKS_TABLE_NAME).insert(FOLKLORE_TRACKS);
};

const down = async (knex: Knex): Promise<void> => {
  await knex(Tables.FILES_TABLE_NAME).del();
  await knex(Tables.ARTISTS_TABLE_NAME).del();
  await knex(Tables.GENRES_TABLE_NAME).del();
  await knex(Tables.IMAGES_TABLE_NAME).del();
  await knex(Tables.TRACKS_TABLE_NAME).del();
};

export { down, up };
