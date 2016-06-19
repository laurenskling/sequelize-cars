import Sequelize from 'sequelize';
import Faker from 'faker';

const Conn = new Sequelize(
  'sequelize', // db name
  'root', // db user
  '', // db pass
  {
    dialect: 'mysql',
    host: 'localhost',
    define: {
      engine: 'MYISAM',
    },
  }
);

const modelsDir = `${__dirname}/models`;
const Company = Conn.import(`${modelsDir}/company`);
const Car = Conn.import(`${modelsDir}/car`);
const Image = Conn.import(`${modelsDir}/image`);
const Accessorie = Conn.import(`${modelsDir}/accessorie`);
const WdFeed = Conn.import(`${modelsDir}/feed/wd`);
const OecFeed = Conn.import(`${modelsDir}/feed/oec`);
const NakFeed = Conn.import(`${modelsDir}/feed/nak`);
const MpFeed = Conn.import(`${modelsDir}/feed/mp`);

Car.belongsTo(Company, { foreignKey: 'companyId' });
Car.hasMany(Image, { foreignKey: 'naaId' });
Car.hasMany(Accessorie, { foreignKey: 'naaId' });
Car.hasMany(WdFeed, { foreignKey: 'naaId' });
Car.hasMany(OecFeed, { foreignKey: 'naaId' });
Car.hasMany(NakFeed, { foreignKey: 'naaId' });
Car.hasMany(MpFeed, { foreignKey: 'naaId' });

// create DB
Conn.sync({force: true}).then(() => {
  for (let i = 0; i < 5; i++) {
    Company.create({
      clientId: Faker.random.number(),
      OECClientId: 0,
      name: Faker.company.companyName(),
      address: Faker.address.streetName(),
      zipcode: Faker.address.zipCode(),
      city: Faker.address.city(),
      email: Faker.internet.email(),
      telephone: Faker.random.number(),
      website: Faker.image.imageUrl(),
    }).then((company) => {
      for (let i = 0; i < 5; i++) {
        createCar(company);
      }
    });
  }
});

const createCar = (company) => {
  const type = createType(Faker.random.number(5));

  Car.create({
    companyId: company.dataValues.companyId,
    hexonId: Faker.random.number(4) === 1 ? 0 : Faker.random.number(99999999),
    clientId: Faker.random.number(9999),
    vehicleType: 'Personenauto',
    brand: Faker.random.word(),
    model: Faker.random.word(),
    type: Faker.random.word(),
    licensePlate: `${Faker.fake('{{random.alphaNumeric}}{{random.alphaNumeric}}-{{random.alphaNumeric}}{{random.alphaNumeric}}-{{random.alphaNumeric}}{{random.alphaNumeric}}')}`,
    body: 'Hatchback',
    fuel: 'Benzine',
    transmission: 'Handgeschakeld',
    numberOfGears: 6,
    numberOfDoors: 5,
    mileage: Faker.random.number(999),
    year: `20${Faker.random.number(16)}`,
    color: 'white',
    interiorColor: 'black',
    emission: Faker.random.number(99),
    energyLabel: 'A',
    stockPrice: Faker.random.number(99999),
    price: Faker.random.number(99999),
    preparationCost: Faker.random.number(999),
    expected: Faker.random.number(1),
    remarks: Faker.lorem.paragraph(),
    sendtomp: type,
    sendtonak: type,
    mpKey: `m${Faker.random.number(9999999999)}`,
  }).then(car => {
    const count = 5;
    for (let i = 0; i < count; i++) {
      createImage(car, Faker.random.number(count));
      createAccessorie(car);
      if (car.hexonId === 0) {
        createOec(car);
      } else {
        createWd(car);
      }
      createNak(car);
      createMp(car);
    }
  });
}

const createType = (number) => {
  switch(number) {
    case 0:
      return 'add';
    case 1:
      return 'change';
    case 2:
      return 'failed';
    default:
      return '';
  }
}

const createImage = (car, number) => {
  return Image.create({
    naaId: car.dataValues.id,
    image: Faker.image.transport(),
    order: number,
    large: 546,
    medium: 494,
    small: 294,
    xsmall: 194,
    thumb: 62,
  });
}

const createAccessorie = (car) => {
  return Accessorie.create({
    naaId: car.dataValues.id,
    value: Faker.random.word(),
  });
}

const createWd = (car) => {
  return WdFeed.create({
    naaId: car.dataValues.id,
    hexonId: car.dataValues.hexonId,
    type: createType(Faker.random.number(1)),
    status: Faker.random.number(2) % 2 ? 'ERROR' : 'OK',
    text: `<?xml version="1.0" encoding="UTF-8"?>
      <mutatie>
      	<actie>change</actie>
      	<klantnummer>11</klantnummer>
      	<advertentienummer>073051754</advertentienummer>
      	<voertuigsoort>Personenauto</voertuigsoort>
      	<merk>Mitsubishi</merk>
      	<model>Colt</model>
      	<type>1.1 5-drs EDITION 2 CLEARTEC</type>
      	<kenteken>#94561</kenteken>
      	<carrosserie>Hatchback</carrosserie>
      	<brandstof>Benzine</brandstof>
      	<transmissie>Handgeschakeld</transmissie>
      	<aantal_versnellingen>5</aantal_versnellingen>
      	<aantal_deuren>5</aantal_deuren>
      	<km_stand>10</km_stand>
      	<bouwjaar>2013</bouwjaar>
      	<kleur>Zwart</kleur>
      	<interieurkleur>Zwart</interieurkleur>
      	<co2_uitstoot></co2_uitstoot>
      	<energielabel/>
      	<vermogen>55</vermogen>
      	<prijs>13937</prijs>
      	<actieprijs>10950</actieprijs>
      	<rijklaar_kosten/>
      	<bpm>0</bpm>
      	<garantie/>
      	<verwacht>0</verwacht>
      	<accessoires>
      		<accessoire>Achterbank neerklapbaar</accessoire>
      		<accessoire>Achterbank neerklapbaar (ongelijke delen)</accessoire>
      		<accessoire>Airbags voor</accessoire>
      		<accessoire>Airconditioning</accessoire>
      		<accessoire>Anti blokkeer systeem</accessoire>
      		<accessoire>Bestuurdersstoel in hoogte verstelbaar</accessoire>
      		<accessoire>Boordcomputer</accessoire>
      		<accessoire>Buitenspiegels in carrosseriekleur</accessoire>
      		<accessoire>Buitentemperatuurmeter</accessoire>
      		<accessoire>Bumpers in carrosseriekleur</accessoire>
      		<accessoire>Centrale deurvergrendeling afstandbediend</accessoire>
      		<accessoire>Elektrisch bedienbare ramen voor</accessoire>
      		<accessoire>Elektrisch bedienbare ramen voor en achter</accessoire>
      		<accessoire>Hoofdsteunen achter</accessoire>
      		<accessoire>In hoogte verstelbaar stuur</accessoire>
      		<accessoire>Lederen stuurwiel</accessoire>
      		<accessoire>Lichtmetalen velgen</accessoire>
      		<accessoire>Mistlampen voor</accessoire>
      		<accessoire>Radio</accessoire>
      		<accessoire>Regensensor</accessoire>
      		<accessoire>Stuurbekrachtiging</accessoire>
      		<accessoire>Zij-airbags voor</accessoire>
      	</accessoires>
      	<opmerkingen>Betreft een nieuwe uit voorraad te leveren Mitshubishi COLT ACTIEKORTING van â‚¬2.987,-. Inclusief opties, exclusief metaallak en kosten rijklaar maken! Neem voor meer informatie over deze of andere modellen contact op met 030-2624044. Dealer onderhouden (onderhoudsboekjes aanwezig); Fabrieksgarantie tot 31-10-2015</opmerkingen>
      	<afbeeldingen>
      		<afbeelding volgnr="1" md5="642d3f6383cf755cfe1f3f121c4acd10">http://nieuweautoaanbiedingen.export.doorlinkenvoorraad.nl/21108353/image1.jpg</afbeelding>
      		<afbeelding volgnr="2" md5="b9a9c804b6f1f0a15dfe8c2b19e42884">http://nieuweautoaanbiedingen.export.doorlinkenvoorraad.nl/21108356/image2.jpg</afbeelding>
      		<afbeelding volgnr="3" md5="2f61b686bba736e65af22254261d3e27">http://nieuweautoaanbiedingen.export.doorlinkenvoorraad.nl/21108358/image3.jpg</afbeelding>
      		<afbeelding volgnr="4" md5="b9d9bec1f0eea4997ead6d440c057ed8">http://nieuweautoaanbiedingen.export.doorlinkenvoorraad.nl/21108359/image4.jpg</afbeelding>
      		<afbeelding volgnr="5" md5="ea7ed26c0ba536fd13aced9a48a89ae9">http://nieuweautoaanbiedingen.export.doorlinkenvoorraad.nl/21108361/image5.jpg</afbeelding>
      		<afbeelding volgnr="6" md5="ec691a406b6e2902ca7e6c27e8bfd510">http://nieuweautoaanbiedingen.export.doorlinkenvoorraad.nl/21108362/image6.jpg</afbeelding>
      		<afbeelding volgnr="7" md5="d041240438e9910308fb99b88a42dd1b">http://nieuweautoaanbiedingen.export.doorlinkenvoorraad.nl/21108363/image7.jpg</afbeelding>
      		<afbeelding volgnr="8" md5="7527e2dcffd16f7f75e5a65415156708">http://nieuweautoaanbiedingen.export.doorlinkenvoorraad.nl/21108364/image8.jpg</afbeelding>
      		<afbeelding volgnr="9" md5="5f47c037e8f6c2adaf9c2f5841fc68df">http://nieuweautoaanbiedingen.export.doorlinkenvoorraad.nl/21108365/image9.jpg</afbeelding>
      		<afbeelding volgnr="10" md5="318e369243548cefb1cd91e12bbf391a">http://nieuweautoaanbiedingen.export.doorlinkenvoorraad.nl/21108366/image10.jpg</afbeelding>
      		<afbeelding volgnr="11" md5="9df9a2a36c35f72d63df3a0073793f94">http://nieuweautoaanbiedingen.export.doorlinkenvoorraad.nl/21108367/image11.jpg</afbeelding>
      		<afbeelding volgnr="12" md5="cf69ba8707ab19cbac49d8ddae4d3ec8">http://nieuweautoaanbiedingen.export.doorlinkenvoorraad.nl/21108368/image12.jpg</afbeelding>
      	</afbeeldingen>
      	<videos/>
      	<bedrijfsgegevens>
      		<naam>Koops Utrecht</naam>
      		<adres>Franciscusdreef 74</adres>
      		<postcode>3565AD</postcode>
      		<plaats>UTRECHT</plaats>
      		<email>j.djong@koops-auto.nl</email>
      		<telefoon>030-2626292</telefoon>
      		<website>www.koopsauto.nl</website>
      	</bedrijfsgegevens>
      </mutatie>
    `,
    response: `
      error saving car info: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near '
      verwacht =    	        "0",
      opmerkingen =    	' at line 23
    `,
    returning: `
      <?xml version="1.0" encoding="UTF-8"?>
      <result>
        <status>FAILED</status>
        <errormsg> error saving car info: You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near '
        verwacht =    	        "0",
        opmerkingen =    	' at line 23</errormsg>
        <url>http://www.nieuweautoaanbiedingen.nl/direct-leverbaar-nieuwe-auto/15</url>
      </result>
    `,

  });
}

const createOec = (car) => {
  return OecFeed.create({
    naaId: car.dataValues.id,
    type: createType(Faker.random.number(1)),
    status: Faker.random.number(2) % 2 ? 'FAILED' : 'OK',
    licensePlate: car.dataValues.licensePlate,
    text: `
      <occasion>
        <carrosserie_soort>HBCK</carrosserie_soort>
        <kenteken>524559</kenteken>
        <merk>Chevrolet</merk>
        <model>Spark</model>
        <uitvoering>1.0-LS Bi-fuel 2013 [NIEUWE AUTO]</uitvoering>
        <soort_kenteken>GE</soort_kenteken>
        <datum_deel_1>30-12-1899</datum_deel_1>
        <prijs_verkoop>10845</prijs_verkoop>
        <btw_marge>V</btw_marge>
        <kmstand>6</kmstand>
        <cilinder_aantal>4</cilinder_aantal>
        <cilinder_inhoud>998</cilinder_inhoud>
        <motor_vermogen>68</motor_vermogen>
        <verbruik_liter_100km>6,80000019073486</verbruik_liter_100km>
        <brandstof>LPG G3</brandstof>
        <transmissie>Handgeschakeld</transmissie>
        <aangedreven_wielen>2</aangedreven_wielen>
        <aantal_versnellingen>5</aantal_versnellingen>
        <bouwjaar>2013</bouwjaar>
        <kleur_basis>Zwart</kleur_basis>
        <kleur_vrij>Honey Mellow Yellow</kleur_vrij>
        <aantal_deuren>5</aantal_deuren>
        <bekleding>Stof grijs</bekleding>
        <gewicht>929</gewicht>
        <laad_vermogen/>
        <daklast/>
        <treklast/>
        <treklast_ongeremd/>
        <prijs_kosten_rijklaar>0</prijs_kosten_rijklaar>
        <prijs_handel>0</prijs_handel>
        <prijs_vraagprijs_excl>0</prijs_vraagprijs_excl>
        <prijs_houderschapsbelasting>28</prijs_houderschapsbelasting>
        <datum_ontvangst>28-02-2013</datum_ontvangst>
        <garantie_soort>Fabrieksgarantie</garantie_soort>
        <garantie_aantal_maanden>36</garantie_aantal_maanden>
        <occasion_label>Bovag</occasion_label>
        <accessoires>AUDIO, AIRBAG, ABS, LICHTM_VELGEN, ELEK_RAMEN, CENT_VERGR, STUUR_BEKR, AIRCO, START_ONDER</accessoires>
        <extra_accessoires>Zij-airbags voor, Airbags voor, Gordijn-airbags voor, Gordijn-airbags achter, CD-speler, Deelbare achterbank (ongelijke delen), Getint glas, Interval ruitenwisser, Ruitenwisser achter, Remkrachtverdeling, 5-persoons, Toerenteller, Boekjes aanwezig, Elektr. ramen voor, In hoogte verstelbare stoel, Hoge Instap</extra_accessoires>
        <opmerkingen>Verkoopprijs inclusief &amp;euro; 1.550,- kortinginruilvoordeel, Verkoopprijs exclusief kosten rijklaar maken</opmerkingen>
        <opmerkingen_b2b/>
        <catalogusprijs>0</catalogusprijs>
        <prijs_van_voor/>
        <fotos>
          <foto nr="1" url="http://images.oec.nl/imagestore/get.aspx?filename=5245591_9710.jpg&amp;width=640&amp;height=480" nieuw="N">9710_524559_1.JPG</foto>
          <foto nr="2" url="http://images.oec.nl/imagestore/get.aspx?filename=5245592_9710.jpg&amp;width=640&amp;height=480" nieuw="N">9710_524559_2.JPG</foto>
          <foto nr="3" url="http://images.oec.nl/imagestore/get.aspx?filename=5245593_9710.jpg&amp;width=640&amp;height=480" nieuw="N">9710_524559_3.JPG</foto>
          <foto nr="4" url="http://images.oec.nl/imagestore/get.aspx?filename=5245594_9710.jpg&amp;width=640&amp;height=480" nieuw="N">9710_524559_4.JPG</foto>
          <foto nr="5" url="http://images.oec.nl/imagestore/get.aspx?filename=5245595_9710.jpg&amp;width=640&amp;height=480" nieuw="N">9710_524559_5.JPG</foto>
          <foto nr="6" url="http://images.oec.nl/imagestore/get.aspx?filename=5245596_9710.jpg&amp;width=640&amp;height=480" nieuw="N">9710_524559_6.JPG</foto>
          <foto nr="7" url="http://images.oec.nl/imagestore/get.aspx?filename=5245597_9710.jpg&amp;width=640&amp;height=480" nieuw="N">9710_524559_7.JPG</foto>
          <foto nr="8" url="http://images.oec.nl/imagestore/get.aspx?filename=5245598_9710.jpg&amp;width=640&amp;height=480" nieuw="N">9710_524559_8.JPG</foto>
          <foto nr="9" url="http://images.oec.nl/imagestore/get.aspx?filename=5245599_9710.jpg&amp;width=640&amp;height=480" nieuw="N">9710_524559_9.JPG</foto>
        </fotos>
      <klantnummer>0</klantnummer><voertuigsoort></voertuigsoort><type>1.0-LS Bi-fuel 2013 [NIEUWE AUTO]</type><carrosserie>Hatchback</carrosserie><km_stand>6</km_stand><kleur>Zwart</kleur><interieurkleur></interieurkleur><co2_uitstoot></co2_uitstoot><prijs>10845</prijs><actieprijs>0</actieprijs><rijklaar_kosten>0</rijklaar_kosten><verwacht>0</verwacht></occasion>
    `,
    response: `
      U dient een catalogusprijs aan te geven. Advertentie moet minimaal 5 foto's betvatten.
    `,
    returning: ``,
  });
}

const createNak = (car) => {
  return NakFeed.create({
    naaId: car.dataValues.id,
    type: createType(Faker.random.number(1)),
    status: Faker.random.number(2) % 2 ? 'FAILED' : 'OK',
    text: `
      <?xml version="1.0" encoding="UTF-8"?>
      <mutatie>
      	<actie>change</actie>
      	<klantnummer>303</klantnummer>
      	<advertentienummer>764156925</advertentienummer>
      	<voertuigsoort>Personenauto</voertuigsoort>
      	<merk>Opel</merk>
      	<model>ADAM</model>
      	<type>1.4 Ecoflex Start/stop Glam â‚¬ 2.000,00 aktie-voordeel</type>
      	<kenteken/>
      	<carrosserie>Hatchback</carrosserie>
      	<brandstof>Benzine</brandstof>
      	<transmissie>Handgeschakeld</transmissie>
      	<aantal_versnellingen>5</aantal_versnellingen>
      	<aantal_deuren>3</aantal_deuren>
      	<km_stand>1</km_stand>
      	<bouwjaar>2013</bouwjaar>
      	<kleur>Paars</kleur>
      	<interieurkleur>Paars</interieurkleur>
      	<co2_uitstoot/>
      	<energielabel/>
      	<vermogen>64</vermogen>
      	<prijs>19875</prijs>
      	<actieprijs>17875</actieprijs>
      	<rijklaar_kosten>743</rijklaar_kosten>
      	<bpm>0</bpm>
      	<garantie/>
      	<verwacht>0</verwacht>
      	<accessoires>
      		<accessoire>17-inch 'roulette'-velgen, diamant-geslepen, in diverse kleuren</accessoire>
      		<accessoire>ABS (anti blokkeer systeem)</accessoire>
      		<accessoire>Achterbank neerklapbaar in gelijke delen en voorzien van hoofdsteunen</accessoire>
      		<accessoire>Adam package 1 incl sight amp; light pack 1</accessoire>
      		<accessoire>Adam package 1 incl sight amp; light pack 2</accessoire>
      		<accessoire>Airbags</accessoire>
      		<accessoire>Bandenspanningcontrolesysteem</accessoire>
      		<accessoire>Bekerhouders voor</accessoire>
      		<accessoire>Bekleding leder</accessoire>
      		<accessoire>Bekleding leder purple of cocoa</accessoire>
      		<accessoire>Binnenspiegel automatisch dimmend</accessoire>
      		<accessoire>Boordcomputer</accessoire>
      		<accessoire>Buitenspiegels elektrisch verstelbaar</accessoire>
      		<accessoire>Buitenspiegels elektrisch verstelbaar en verwarmbaar</accessoire>
      		<accessoire>Buitenspiegels in carrosseriekleur</accessoire>
      		<accessoire>Centrale deurvergrendeling met afstandsbediening</accessoire>
      		<accessoire>Cruise control</accessoire>
      		<accessoire>Dakkleur 'white my fire'</accessoire>
      		<accessoire>ECC (electronic climate control)</accessoire>
      		<accessoire>ESP (elektronische stabiliteits programma)</accessoire>
      		<accessoire>Glas getint</accessoire>
      		<accessoire>Gordijnairbags voor</accessoire>
      		<accessoire>Hill hold control</accessoire>
      		<accessoire>Lichtmetalen velgen 16 inch</accessoire>
      		<accessoire>Lichtmetalen velgen 17 inch</accessoire>
      		<accessoire>Lichtsensor</accessoire>
      		<accessoire>Multimedia systeem</accessoire>
      		<accessoire>Panoramadak</accessoire>
      		<accessoire>Parkeersensoren achter</accessoire>
      		<accessoire>Radio met bluetooth functie</accessoire>
      		<accessoire>Radio met usb aansluiting</accessoire>
      		<accessoire>Ramen voor elektrisch bedienbaar</accessoire>
      		<accessoire>Regensensor</accessoire>
      		<accessoire>Side-airbags voor</accessoire>
      		<accessoire>Stuur bekleed met leder</accessoire>
      		<accessoire>Stuurbekrachtiging snelheidsafhankelijk</accessoire>
      		<accessoire>Stuur multifunctioneel</accessoire>
      		<accessoire>Stuur verwarmbaar</accessoire>
      		<accessoire>Voorstoelen verwarmbaar</accessoire>
      	</accessoires>
      	<opmerkingen>Het betreft hier een nieuwe Opel Adam, uit voorraad leverbaar, zonder kenteken ! Prijs is exclusief kosten rijklaarmaken â‚¬ 743,00 , aktie-voordeel is reeds verrekend in de aanbiedingsprijs. Uiterlijke kenteken registratie 31-12-2013</opmerkingen>
      	<afbeeldingen>
      		<afbeelding volgnr="1" md5="493dbd25a1a13a348a3a5f5695fcb5ab">image1.jpg</afbeelding>
      		<afbeelding volgnr="2" md5="afdac1f05954396b5cd71af7f54207b0">image2.jpg</afbeelding>
      		<afbeelding volgnr="3" md5="545f0209d4e9ef22448389a884eb0bf8">image3.jpg</afbeelding>
      		<afbeelding volgnr="4" md5="d435412338ed0433036b6a0b73feb107">image4.jpg</afbeelding>
      		<afbeelding volgnr="5" md5="b2981e66cc82126b95364bd4bf4e4349">image5.jpg</afbeelding>
      		<afbeelding volgnr="6" md5="d4027743adb269322e7fc9ac11b9d6a2">image6.jpg</afbeelding>
      		<afbeelding volgnr="7" md5="09ddb3a4546734754e334fe71379898f">image7.jpg</afbeelding>
      		<afbeelding volgnr="8" md5="6ba6eafee0935fd40d9f54af86d642a2">image8.jpg</afbeelding>
      		<afbeelding volgnr="9" md5="e403f5e2081cefa79d67c97c05b7bc65">image9.jpg</afbeelding>
      	</afbeeldingen>
      	<videos/>
      	<bedrijfsgegevens>
      		<naam>Autobedrijf Kooiman BV</naam>
      		<adres>Langeweg 3C</adres>
      		<postcode>3261LJ</postcode>
      		<plaats>OUD BEYERLAND</plaats>
      		<email>verkoop@kooiman.nl</email>
      		<telefoon>0186-615455</telefoon>
      		<website>www.kooiman.nl</website>
      	</bedrijfsgegevens>
      <naaid>2470</naaid><naa_klantnummer>172</naa_klantnummer></mutatie>
    `,
    response: `
      sending to dov-endpoint error: Direct-op-voorraad mutatie niet verwerkt: ongeldig klantnummer ()
    `,
    returning: `
      url => https://www.nieuweautokopen.nl/direct-op-voorraad/dov-endpoint, content_type => text/html; charset=utf-8, http_code => 400, header_size => 328, request_size => 426, filetime => -1, ssl_verify_result => 0, redirect_count => 0, total_time => 0.345176, namelookup_time => 0.003584, connect_time => 0.005664, pretransfer_time => 0.333669, size_upload => 263, size_download => 65, speed_download => 188, speed_upload => 761, download_content_length => 65, upload_content_length => 0, starttransfer_time => 0.34517, redirect_time => 0, redirect_url => , primary_ip => 82.94.237.42, certinfo => Array,
    `,
  });
}

const createMp = (car) => {
  return MpFeed.create({
    naaId: car.dataValues.id,
    type: createType(Faker.random.number(1)),
    status: Faker.random.number(2) % 2 ? 'FAILED' : 'OK',
    text: `
      {"model":"Overige modellen","seller":{"sellerName":"Nieuweautokopen.nl","phoneNumber":"0850187023"},"location":{"postcode":"1097DN"},"makeDescription":"Iveco","modelDescription":"Daily","trim":"35-170 3.0 3750 Hi Matic **TRUCKLAND SCHIPHOL** Voor info: r.de.koning@truckland.nl","numberOfDoors":"2","fuel":"Diesel","body":"Overige carrosserie\u00ebn","transmission":"Automaat","color":"Wit","constructionYear":"2016","mileage":"500","licensePlate":"","priceModel":{"modelType":"fixed","askingPrice":3799500},"categoryId":92,"title":"Iveco Daily 35-170 3.0 3750 Hi Matic **TRUCKLAND SCHIPHOL** ","description":"Deze auto wordt aangeboden door Truckland Noord-Holland in Amsterdam.<br\/><br\/><strong>Opties:<\/strong><ul><li>Tussenwand zonder ruit<\/li><li>Stuurwiel multifunctioneel<\/li><li>Stuur in hoogte verstelbaar<\/li><li>Stuurbekrachtiging<\/li><li>In hoogte verstelbare bestuurdersstoel<\/li><li>Hill hold-functie<\/li><li>Getint warmtewerend glas<\/li><li>Esp en asr<\/li><li>Elektrisch bedienbare ramen voor<\/li><li>Cruise control<\/li><li>Centrale deurvergrendeling afstandbediend<\/li><li>Bijrijdersbank<\/li><li>Autotelefoonvoorbereiding met bluetooth<\/li><li>Antislipregeling<\/li><li>Antiblokkeersysteem<\/li><li>Airco (automatisch)<\/li><li>Airbag bestuurder en gordelspanners<\/li><li>Abs en ebd<\/li><\/ul><br\/>Onze prijs: &euro; 37.995,-\n      <br\/><br\/>\n      De in deze advertentie opgenomen auto wordt aangeboden door Truckland Noord-Holland in Amsterdam. Truckland Noord-Holland maakt voor het aanbieden van deze auto gebruik van de diensten van Nieuweautokopen.nl.\n      Indien u contact met ons opneemt via bovenstaand telefoonnummer dan zal Nieuweautokopen.nl namens ons het eerste contact verzorgen, en u vervolgens met ons in contact brengen.\n      Nieuweautokopen.nl kan uw persoonsgegevens opnemen in haar administratie. Deze persoonsgegevens zullen door Nieuweautokopen.nl enkel worden gebruikt om u met ons in contact te brengen, en niet voor enig ander doel.\n    "}
    `,
    response: `
      {"_links":{"self":{"href":"/v1/advertisements/m1054902188"},"describedby":{"href":"https://api.marktplaats.nl/docs/v1/advertisement.html"},"curies":[{"href":"https://api.marktplaats.nl/docs/v1/rels/{rel}.html","templated":true,"name":"mp"}],"mp:category":{"href":"/v1/categories/91/92"},"mp:seller":{"href":"/v1/users/2668711"},"mp:advertisement-features":{"href":"/v1/advertisements/m1054902188/features"},"mp:advertisement-images":{"href":"/v1/advertisements/m1054902188/images"},"mp:advertisement-statistics":{"href":"/v1/advertisements/m1054902188/statistics"},"mp:bids":{"href":"/v1/advertisements/m1054902188/bids"},"mp:advertisement-transactions":{"href":"/v1/advertisements/m1054902188/transactions"},"mp:fitments":{"href":"/v1/advertisements/m1054902188/fitments"},"mp:fitments-by-ktype":{"href":"/v1/advertisements/m1054902188/fitments/ktype"},"mp:advertisement-website-link":{"href":"http://www.marktplaats.nl/a/auto-s/alfa-romeo/m1054902188-iveco-daily-35-170-3-0-3750-hi-matic-truckland-schiphol.html?c=aba4801fe1dcfdf8e084fd4b2e0a17e"},"mp:advertisement-renew":{"href":"/v1/advertisements/m1054902188/renew"}},"_embedded":{"mp:advertisement-images":{"_links":{"self":{"href":"/v1/advertisements/m1054902188/images"}},"_embedded":{"mp:advertisement-image":[]}}},"itemId":"m1054902188","title":"Iveco Daily 35-170 3.0 3750 Hi Matic **TRUCKLAND SCHIPHOL** ","description":"Deze auto wordt aangeboden door Truckland Noord-Holland in Amsterdam.<br/><br/><strong>Opties:</strong><br/><ul><li>Tussenwand zonder ruit</li><li>Stuurwiel multifunctioneel</li><li>Stuur in hoogte verstelbaar</li><li>Stuurbekrachtiging</li><li>In hoogte verstelbare bestuurdersstoel</li><li>Hill hold-functie</li><li>Getint warmtewerend glas</li><li>Esp en asr</li><li>Elektrisch bedienbare ramen voor</li><li>Cruise control</li><li>Centrale deurvergrendeling afstandbediend</li><li>Bijrijdersbank</li><li>Autotelefoonvoorbereiding met bluetooth</li><li>Antislipregeling</li><li>Antiblokkeersysteem</li><li>Airco (automatisch)</li><li>Airbag bestuurder en gordelspanners</li><li>Abs en ebd</li></ul><br/>Onze prijs: &euro; 37.995,-<br/><br/><br/>De in deze advertentie opgenomen auto wordt aangeboden door Truckland Noord-Holland in Amsterdam. Truckland Noord-Holland maakt voor het aanbieden van deze auto gebruik van de diensten van Nieuweautokopen.nl.<br/>Indien u contact met ons opneemt via bovenstaand telefoonnummer dan zal Nieuweautokopen.nl namens ons het eerste contact verzorgen, en u vervolgens met ons in contact brengen.<br/>Nieuweautokopen.nl kan uw persoonsgegevens opnemen in haar administratie. Deze persoonsgegevens zullen door Nieuweautokopen.nl enkel worden gebruikt om u met ons in contact te brengen, en niet voor enig ander doel.<br/>","categoryId":92,"priceModel":{"modelType":"fixed","askingPrice":3799500},"location":{"postcode":"1097DN","cityName":"Amsterdam"},"licensePlate":"","seller":{"sellerId":2668711,"sellerName":"Nieuweautokopen.nl","phoneNumber":"0850187023","acceptPaypal":false},"showOnMap":false,"status":"online","startDate":"2016-05-27T07:58:44Z","closeDate":"2016-06-27T07:58:44Z","renewPossible":false,"advertiser":"Bedrijf","model":"Overige modellen","constructionYear":2016,"fuel":"Diesel","mileage":500,"body":"Overige carrosserieÃ«n","numberOfDoors":2,"transmission":"Automaat","color":"Wit","makeDescription":"Iveco","modelDescription":"Daily","trim":"35-170 3.0 3750 Hi Matic **TRUCKLAND SCHIPHOL** Voor info: r.de.koning@truckland.nl"}
    `,
    returning: `

    `,
  });
}

export default Conn;
