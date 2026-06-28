import { listOutline, locationOutline, peopleOutline } from 'ionicons/icons';
import { z, object } from 'zod';
import { Choice } from '@flumens/tailwind/dist/Survey';
import { IonIcon } from '@ionic/react';
import locations, { bySurvey } from 'common/models/collections/locations';
import Location from 'common/models/location';
import Occurrence from 'common/models/occurrence';
import { Data } from 'common/models/sample';
import userModel from 'common/models/user';
import appModel from 'models/app';
import {
  blockToAttr,
  byGroup,
  grazingAnimalsAttr,
  grazingAttr,
  gridAttr,
  groupAttr,
  lichensAttr,
  litterAttr,
  locationAttr,
  managementAttr,
  managementOtherAttr,
  recorderAttr,
  rockCoverAttr,
  woodCoverAttr,
  soilAttr,
  Survey,
  dominCoverValues,
  STANDARD_SURVEY_ID,
} from 'Survey/common/config';

const peopleOutlineIcon = (
  <IonIcon src={peopleOutline} className="size-6" />
) as any;

const listOutlineIcon = (
  <IonIcon src={listOutline} className="size-6" />
) as any;

const locationOutlineIcon = (
  <IonIcon src={locationOutline} className="size-6" />
) as any;

export const bbCoverValues = [
  { title: '+,<1%', dataName: '18886' },
  { title: '1,1-5%', dataName: '18887' },
  { title: '2,6-25%', dataName: '18888' },
  { title: '3,26-50%', dataName: '18889' },
  { title: '4,51-75%', dataName: '18890' },
  { title: '5,76-100%', dataName: '18891' },
];

export const ABSENT_VALUE = '18894';
export const presenceCoverValues = [
  { title: 'Present', dataName: '18893' },
  { title: 'Absent', dataName: ABSENT_VALUE },
];

export const abundanceAttr = {
  id: 'smpAttr:1625',
  type: 'choiceInput',
  title: 'Abundance type',
  prefix: peopleOutlineIcon,
  appearance: 'button',
  choices: [
    { title: 'Domin', dataName: '18881' },
    { title: 'Braun-Blanquet', dataName: '18882' },
    { title: 'Percentage', dataName: '18883' },
    { title: 'Individual plant count', dataName: '18884' },
    { title: 'Cell frequency', dataName: '18885' },
    { title: 'Present/Absent', dataName: '18892' },
  ],
} as const;

export const speciesCommentsAttr = {
  id: 'smpAttr:1796',
  type: 'textInput',
  title: 'Species comments',
  appearance: 'multiline',
} as const;

export const vegetationHeight1Attr = {
  id: 'smpAttr:1626',
  type: 'numberInput',
  title: 'Vegetation height 1',
  appearance: 'counter',
  validations: { min: 0 },
} as const;

export const vegetationHeight2Attr = {
  id: 'smpAttr:1627',
  type: 'numberInput',
  title: 'Vegetation height 2',
  appearance: 'counter',
  validations: { min: 0 },
} as const;

export const vegetationHeight3Attr = {
  id: 'smpAttr:1628',
  type: 'numberInput',
  title: 'Vegetation height 3',
  appearance: 'counter',
  validations: { min: 0 },
} as const;

export const vegetationHeight4Attr = {
  id: 'smpAttr:1629',
  type: 'numberInput',
  title: 'Vegetation height 4',
  appearance: 'counter',
  validations: { min: 0 },
} as const;

export const vegetationHeight5Attr = {
  id: 'smpAttr:1630',
  type: 'numberInput',
  title: 'Vegetation height 5',
  appearance: 'counter',
  validations: { min: 0 },
} as const;

export const vegetationHeightAverageAttr = {
  id: 'smpAttr:1748',
  type: 'numberInput',
  title: 'Vegetation height average',
  appearance: 'counter',
  validations: { min: 0 },
} as const;

export const vegetationHeightComment = {
  id: 'smpAttr:1631',
  type: 'textInput',
  title: 'Vegetation height comment',
  appearance: 'multiline',
} as const;

export const partialSampleAttr = {
  id: 'smpAttr:1636',
  type: 'choiceInput',
  title: 'Partial sample (vascular plants)',
  prefix: listOutlineIcon,
  appearance: 'button',
  choices: [
    { title: 'Yes', dataName: '18898' },
    { title: 'No', dataName: '18899' },
  ],
} as const;

export const bryophytesRecordedAttr = {
  id: 'smpAttr:1632',
  type: 'choiceInput',
  title: 'Bryophytes recorded',
  prefix: listOutlineIcon,
  appearance: 'button',
  choices: [
    { title: 'All', dataName: '18895' },
    { title: 'Some', dataName: '18896' },
    { title: 'None', dataName: '18897' },
  ],
} as const;

export const lichensRecordedAttr = {
  id: 'smpAttr:1633',
  type: 'choiceInput',
  title: 'Lichens recorded',
  prefix: listOutlineIcon,
  appearance: 'button',
  choices: [
    { title: 'All', dataName: '18895' },
    { title: 'Some', dataName: '18896' },
    { title: 'None', dataName: '18897' },
  ],
} as const;

export const fungiRecordedAttr = {
  id: 'smpAttr:1634',
  type: 'choiceInput',
  title: 'Fungi recorded',
  prefix: listOutlineIcon,
  appearance: 'button',
  choices: [
    { title: 'All', dataName: '18895' },
    { title: 'Some', dataName: '18896' },
    { title: 'None', dataName: '18897' },
  ],
} as const;

export const algaeRecordedAttr = {
  id: 'smpAttr:1635',
  type: 'choiceInput',
  title: 'Algae recorded',
  prefix: listOutlineIcon,
  appearance: 'button',
  choices: [
    { title: 'All', dataName: '18895' },
    { title: 'Some', dataName: '18896' },
    { title: 'None', dataName: '18897' },
  ],
} as const;

export const grazingAnimalNumberAttr = {
  id: 'smpAttr:1747',
  type: 'numberInput',
  title: 'Grazing animal numbers',
  validations: { min: 1, required: true },
  appearance: 'counter',
  prefix: listOutlineIcon,
} as const;

export const communityAttr = {
  id: 'smpAttr:1770',
  type: 'choiceInput',
  title: 'Community',
  prefix: listOutlineIcon,
  container: 'page',
  choices: [
    { dataName: '20836', title: 'A10 - Polygonum amphibium community' },
    {
      dataName: '20837',
      title: 'A11 - Potamogeton pectinatus-Myriophyllum spicatum community',
    },
    {
      dataName: '20838',
      title: 'A12 - Potamogeton pectinatus community',
    },
    {
      dataName: '20839',
      title:
        'A13 - Potamogeton perfoliatus-Myriophyllum alterniflorum community',
    },
    {
      dataName: '20840',
      title: 'A14 - Myriophyllum alterniflorum community',
    },
    { dataName: '20841', title: 'A15 - Elodea canadensis community' },
    {
      dataName: '20842',
      title: 'A16 - Callitriche stagnalis community',
    },
    {
      dataName: '20843',
      title: 'A17 - Ranunculus penicillatus ssp. pseudofluitans community',
    },
    { dataName: '20844', title: 'A18 - Ranunculus fluitans community' },
    {
      dataName: '20845',
      title: 'A19 - Ranunculus aquatilis community',
    },
    { dataName: '20835', title: 'A1 - Lemna gibba community' },
    { dataName: '20847', title: 'A20 - Ranunculus peltatus community' },
    { dataName: '20848', title: 'A21 - Ranunculus baudotii community' },
    {
      dataName: '20849',
      title: 'A22 - Littorella uniflora-Lobelia dortmanna community',
    },
    {
      dataName: '20850',
      title: 'A23 - Isoetes lacustris/setacea community',
    },
    { dataName: '20851', title: 'A24 - Juncus bulbosus community' },
    { dataName: '20846', title: 'A2 - Lemna minor community' },
    {
      dataName: '20852',
      title: 'A3 - Spirodela polyrhiza-Hydrocharis morsus-ranae community',
    },
    {
      dataName: '20853',
      title: 'A4 - Hydrocharis morsus-ranae-Stratiotes aloides community',
    },
    {
      dataName: '20854',
      title: 'A5 - Ceratophyllum demersum community',
    },
    { dataName: '20855', title: 'A7 - Nymphaea alba community' },
    { dataName: '20856', title: 'A8 - Nuphar lutea community' },
    { dataName: '20857', title: 'A9 - Potamogeton natans community' },
    {
      dataName: '20859',
      title:
        'CG10 - Festuca ovina-Agrostis capillaris-Thymus praecox grassland',
    },
    {
      dataName: '20860',
      title:
        'CG11 - Festuca ovina-Agrostis capillaris-Alchemilla alpina grass-heath',
    },
    {
      dataName: '20861',
      title:
        'CG12 - Festuca ovina-Alchemilla alpina-Silene acaulis dwarf-herb community',
    },
    {
      dataName: '20862',
      title: 'CG13 - Dryas octopetala-Carex flacca heath',
    },
    {
      dataName: '20863',
      title: 'CG14 - Dryas octopetala-Silene acaulis ledge community',
    },
    {
      dataName: '20858',
      title: 'CG1 - Festuca ovina-Carlina vulgaris grassland',
    },
    {
      dataName: '20864',
      title: 'CG2 - Festuca ovina-Avenula pratensis grassland',
    },
    { dataName: '20865', title: 'CG3 - Bromus erectus grassland' },
    {
      dataName: '20866',
      title: 'CG4 - Brachypodium pinnatum grassland',
    },
    {
      dataName: '20867',
      title: 'CG5 - Bromus erectus-Brachypodium pinnatum grassland',
    },
    { dataName: '20868', title: 'CG6 - Avenula pubescens grassland' },
    {
      dataName: '20869',
      title:
        'CG7 - Festuca ovina-Hieracium pilosella-Thymus praecox/pulegioides grassland',
    },
    {
      dataName: '20870',
      title: 'CG8 - Sesleria albicans-Scabiosa columbaria grassland',
    },
    {
      dataName: '20871',
      title: 'CG9 - Sesleria albicans-Galium sterneri grassland',
    },
    {
      dataName: '20873',
      title: 'H10 - Calluna vulgaris-Erica cinerea heath',
    },
    {
      dataName: '20874',
      title: 'H11 - Calluna vulgaris-Carex arenaria heath',
    },
    {
      dataName: '20875',
      title: 'H12 - Calluna vulgaris-Vaccinium myrtillus heath',
    },
    {
      dataName: '20876',
      title: 'H13 - Calluna vulgaris-Cladonia arbuscula heath',
    },
    {
      dataName: '20877',
      title: 'H14 - Calluna vulgaris-Racomitrium lanuginosum heath',
    },
    {
      dataName: '20878',
      title: 'H15 - Calluna vulgaris-Juniperus communis ssp. nana heath',
    },
    {
      dataName: '20879',
      title: 'H16 - Calluna vulgaris-Arctostaphylos uva-ursi heath',
    },
    {
      dataName: '20880',
      title: 'H17 - Calluna vulgaris-Arctostaphylos alpinus heath',
    },
    {
      dataName: '20881',
      title: 'H18 - Vaccinium myrtillus-Deschampsia flexuosa heath',
    },
    {
      dataName: '20882',
      title: 'H19 - Vaccinium myrtillus-Cladonia arbuscula heath',
    },
    {
      dataName: '20872',
      title: 'H1 - Calluna vulgaris-Festuca ovina heath',
    },
    {
      dataName: '20884',
      title: 'H20 - Vaccinium myrtillus-Racomitrium lanuginosum heath',
    },
    {
      dataName: '20885',
      title:
        'H21 - Calluna vulgaris-Vaccinium myrtillus-Sphagnum capillifolium heath',
    },
    {
      dataName: '20886',
      title: 'H22 - Vaccinium myrtillus-Rubus chamaemorus heath',
    },
    {
      dataName: '20883',
      title: 'H2 - Calluna vulgaris-Ulex minor heath',
    },
    {
      dataName: '20887',
      title: 'H3 - Ulex minor-Agrostis curtisii heath',
    },
    {
      dataName: '20888',
      title: 'H4 - Ulex gallii-Agrostis curtisii heath',
    },
    {
      dataName: '20889',
      title: 'H5 - Erica vagans-Schoenus nigricans heath',
    },
    {
      dataName: '20890',
      title: 'H6 - Erica vagans-Ulex europaeus heath',
    },
    {
      dataName: '20891',
      title: 'H7 - Calluna vulgaris-Scilla verna heath',
    },
    {
      dataName: '20892',
      title: 'H8 - Calluna vulgaris-Ulex gallii heath',
    },
    {
      dataName: '20893',
      title: 'H9 - Calluna vulgaris-Deschampsia flexuosa heath',
    },
    {
      dataName: '20895',
      title: 'M10 - Carex dioica-Pinguicula vulgaris mire',
    },
    {
      dataName: '20896',
      title: 'M11 - Carex demissa-Saxifraga aizoides mire',
    },
    { dataName: '20897', title: 'M12 - Carex saxatilis mire' },
    {
      dataName: '20898',
      title: 'M13 - Schoenus nigricans-Juncus subnodulosus mire',
    },
    {
      dataName: '20899',
      title: 'M14 - Schoenus nigricans-Narthecium ossifragum mire',
    },
    {
      dataName: '20900',
      title: 'M15 - Scirpus cespitosus-Erica tetralix wet heath',
    },
    {
      dataName: '20901',
      title: 'M16 - Erica tetralix-Sphagnum compactum wet heath',
    },
    {
      dataName: '20902',
      title: 'M17 - Scirpus cespitosus-Eriophorum vaginatum blanket mire',
    },
    {
      dataName: '20903',
      title: 'M18 - Erica tetralix-Sphagnum papillosum raised and blanket mire',
    },
    {
      dataName: '20904',
      title: 'M19 - Calluna vulgaris-Eriophorum vaginatum blanket mire',
    },
    {
      dataName: '20894',
      title: 'M1 - Sphagnum auriculatum bog pool community',
    },
    {
      dataName: '20906',
      title: 'M20 - Eriophorum vaginatum blanket and raised mire',
    },
    {
      dataName: '20907',
      title: 'M21 - Narthecium ossifragum-Sphagnum papillosum valley mire',
    },
    {
      dataName: '20908',
      title: 'M22 - Juncus subnodulosus-Cirsium palustre fen-meadow',
    },
    {
      dataName: '20909',
      title: 'M23 - Juncus effusus/acutiflorus-Galium palustre rush-pasture',
    },
    {
      dataName: '20910',
      title: 'M24 - Molinia caerulea-Cirsium dissectum fen-meadow',
    },
    {
      dataName: '20911',
      title: 'M25 - Molinia caerulea-Potentilla erecta mire',
    },
    {
      dataName: '20912',
      title: 'M26 - Molinia caerulea-Crepis paludosa mire',
    },
    {
      dataName: '20913',
      title: 'M27 - Filipendula ulmaria-Angelica sylvestris mire',
    },
    {
      dataName: '20914',
      title: 'M28 - Iris pseudacorus-Filipendula ulmaria mire',
    },
    {
      dataName: '20915',
      title: 'M29 - Hypericum elodes-Potamogeton polygonifolius soakway',
    },
    {
      dataName: '20905',
      title: 'M2 - Sphagnum cuspidatum/recurvum bog pool community',
    },
    {
      dataName: '20917',
      title: 'M31 - Anthelia julacea-Sphagnum auriculatum spring',
    },
    {
      dataName: '20918',
      title: 'M32 - Philonotis fontana-Saxifraga stellaris spring',
    },
    {
      dataName: '20919',
      title: 'M33 - Pohlia wahlenbergii var. glacialis spring',
    },
    {
      dataName: '20920',
      title: 'M34 - Carex demissa-Koenigia islandica flush',
    },
    {
      dataName: '20921',
      title: 'M35 - Ranunculus omiophyllus-Montia fontana rill',
    },
    {
      dataName: '20922',
      title: 'M37 - Cratoneuron commutatum-Festuca rubra spring',
    },
    {
      dataName: '20923',
      title: 'M38 - Cratoneuron commutatum-Carex nigra spring',
    },
    {
      dataName: '20916',
      title: 'M3 - Eriophorum angustifolium bog pool community',
    },
    {
      dataName: '20924',
      title: 'M4 - Carex rostrata-Sphagnum recurvum mire',
    },
    {
      dataName: '20925',
      title: 'M5 - Carex rostrata-Sphagnum squarrosum mire',
    },
    {
      dataName: '20926',
      title: 'M6 - Carex echinata-Sphagnum recurvum/auriculatum mire',
    },
    {
      dataName: '20927',
      title: 'M7 - Carex curta-Sphagnum russowii mire',
    },
    {
      dataName: '20928',
      title: 'M8 - Carex rostrata-Sphagnum warnstorfii mire',
    },
    {
      dataName: '20929',
      title: 'M9 - Carex rostrata-Calliergon cuspidatum/giganteum mire',
    },
    {
      dataName: '20931',
      title: 'MC10 - Festuca rubra-Plantago spp. maritime grassland',
    },
    {
      dataName: '20932',
      title:
        'MC11 - Festuca rubra-Daucus carota ssp. gummifer maritime grassland',
    },
    {
      dataName: '20933',
      title:
        'MC12 - Festuca rubra-Hyacinthoides non-scripta maritime bluebell community',
    },
    {
      dataName: '20930',
      title:
        'MC1 - Crithmum maritimum-Spergularia rupicola maritime rock-crevice community',
    },
    {
      dataName: '20934',
      title:
        'MC2 - Armeria maritima-Ligusticum scoticum maritime rock-crevice community',
    },
    {
      dataName: '20935',
      title:
        'MC3 - Rhodiola rosea-Armeria maritima maritime cliff-ledge community',
    },
    {
      dataName: '20936',
      title: 'MC4 - Brassica oleracea maritime cliff-ledge community',
    },
    {
      dataName: '20937',
      title:
        'MC5 - Armeria maritima-Cerastium diffusum ssp. diffusum maritime therophyte community',
    },
    {
      dataName: '20938',
      title:
        'MC6 - Atriplex prostrata-Beta vulgaris ssp. maritima sea-bird cliff community',
    },
    {
      dataName: '20939',
      title: 'MC7 - Stellaria media-Rumex acetosa sea-bird cliff community',
    },
    {
      dataName: '20940',
      title: 'MC8 - Festuca rubra-Armeria maritima maritime grassland',
    },
    {
      dataName: '20941',
      title: 'MC9 - Festuca rubra-Holcus lanatus maritime grassland',
    },
    {
      dataName: '20943',
      title: 'MG10 - Holcus lanatus-Juncus effusus rush-pasture',
    },
    {
      dataName: '20944',
      title:
        'MG11 - Festuca rubra-Agrostis stolonifera-Potentilla anserina grassland',
    },
    {
      dataName: '20945',
      title: 'MG12 - Festuca arundinacea grassland',
    },
    {
      dataName: '20946',
      title: 'MG13 - Agrostis stolonifera-Alopecurus geniculatus grassland',
    },
    {
      dataName: '20942',
      title: 'MG1 - Arrhenatherum elatius grassland',
    },
    {
      dataName: '20947',
      title:
        'MG2 - Arrhenatherum elatius-Filipendula ulmaria tall-herb grassland',
    },
    {
      dataName: '20948',
      title: 'MG3 - Anthoxanthum odoratum-Geranium sylvaticum grassland',
    },
    {
      dataName: '20949',
      title: 'MG4 - Alopecurus pratensis-Sanguisorba officinalis grassland',
    },
    {
      dataName: '20950',
      title: 'MG5 - Cynosurus cristatus-Centaurea nigra grassland',
    },
    {
      dataName: '20951',
      title: 'MG6 - Lolium perenne-Cynosurus cristatus grassland',
    },
    {
      dataName: '20952',
      title: 'MG7 - Lolium perenne leys and related grasslands',
    },
    {
      dataName: '20953',
      title: 'MG8 - Cynosurus cristatus-Caltha palustris grassland',
    },
    {
      dataName: '20954',
      title: 'MG9 - Holcus lanatus-Deschampsia cespitosa grassland',
    },
    {
      dataName: '20956',
      title: 'OV10 - Poa annua-Senecio vulgaris community',
    },
    {
      dataName: '20957',
      title: 'OV11 - Poa annua-Stachys arvensis community',
    },
    {
      dataName: '20958',
      title: 'OV12 - Poa annua-Myosotis arvensis community',
    },
    {
      dataName: '20959',
      title: 'OV13 - Stellaria media-Capsella bursa-pastoris community',
    },
    {
      dataName: '20960',
      title: 'OV14 - Urtica urens-Lamium amplexicaule community',
    },
    {
      dataName: '20961',
      title: 'OV15 - Anagallis arvensis-Veronica persica community',
    },
    {
      dataName: '20962',
      title: 'OV16 - Papaver rhoeas-Silene noctiflora community',
    },
    {
      dataName: '20963',
      title: 'OV17 - Reseda lutea-Polygonum aviculare community',
    },
    {
      dataName: '20964',
      title: 'OV18 - Polygonum aviculare-Chamomilla suaveolens community',
    },
    {
      dataName: '20965',
      title: 'OV19 - Poa annua-Matricaria perforata community',
    },
    {
      dataName: '20955',
      title: 'OV1 - Viola arvensis-Aphanes microcarpa community',
    },
    {
      dataName: '20967',
      title: 'OV20 - Poa annua-Sagina procumbens community',
    },
    {
      dataName: '20968',
      title: 'OV21 - Poa annua-Plantago major community',
    },
    {
      dataName: '20969',
      title: 'OV22 - Poa annua-Taraxacum officinale community',
    },
    {
      dataName: '20970',
      title: 'OV23 - Lolium perenne-Dactylis glomerata community',
    },
    {
      dataName: '20971',
      title: 'OV24 - Urtica dioica-Galium aparine community',
    },
    {
      dataName: '20972',
      title: 'OV25 - Urtica dioica-Cirsium arvense community',
    },
    { dataName: '20973', title: 'OV26 - Epilobium hirsutum community' },
    {
      dataName: '20974',
      title: 'OV27 - Epilobium angustifolium community',
    },
    {
      dataName: '20975',
      title: 'OV28 - Agrostis stolonifera-Ranunculus repens community',
    },
    {
      dataName: '20976',
      title: 'OV29 - Alopecurus geniculatus-Rorippa palustris community',
    },
    {
      dataName: '20966',
      title: 'OV2 - Briza minor-Silene gallica community',
    },
    {
      dataName: '20978',
      title: 'OV30 - Bidens tripartita-Polygonum amphibium community',
    },
    {
      dataName: '20979',
      title: 'OV31 - Rorippa palustris-Filaginella uliginosa community',
    },
    {
      dataName: '20980',
      title: 'OV32 - Myosotis scorpioides-Ranunculus sceleratus community',
    },
    {
      dataName: '20981',
      title: 'OV33 - Polygonum lapathifolium-Poa annua community',
    },
    {
      dataName: '20982',
      title: 'OV34 - Allium schoenoprasum-Plantago maritima community',
    },
    {
      dataName: '20983',
      title: 'OV35 - Lythrum portula-Ranunculus flammula community',
    },
    {
      dataName: '20984',
      title: 'OV36 - Lythrum hyssopifolia-Juncus bufonius community',
    },
    {
      dataName: '20985',
      title: 'OV37 - Festuca ovina-Minuartia verna community',
    },
    {
      dataName: '20986',
      title: 'OV38 - Gymnocarpium robertianum-Arrhenatherum elatius community',
    },
    {
      dataName: '20987',
      title: 'OV39 - Asplenium trichomanes-Asplenium ruta-muraria community',
    },
    {
      dataName: '20977',
      title: 'OV3 - Papaver rhoeas-Viola arvensis community',
    },
    {
      dataName: '20989',
      title: 'OV40 - Asplenium viride-Cystopteris fragilis community',
    },
    { dataName: '20990', title: 'OV41 - Parietaria diffusa community' },
    { dataName: '20991', title: 'OV42 - Cymbalaria muralis community' },
    {
      dataName: '20988',
      title: 'OV4 - Chrysanthemum segetum-Spergula arvensis community',
    },
    {
      dataName: '20992',
      title: 'OV5 - Digitaria ischaemum-Erodium cicutarium community',
    },
    {
      dataName: '20993',
      title: 'OV6 - Cerastium glomeratum-Fumaria muralis ssp. boraei community',
    },
    {
      dataName: '20994',
      title: 'OV7 - Veronica persica-Veronica polita community',
    },
    {
      dataName: '20995',
      title: 'OV8 - Veronica persica-Alopecurus myosuroides community',
    },
    {
      dataName: '20996',
      title: 'OV9 - Matricaria perforata-Stellaria media community',
    },
    { dataName: '20998', title: 'S10 - Equisetum fluviatile swamp' },
    { dataName: '20999', title: 'S11 - Carex vesicaria swamp' },
    { dataName: '21000', title: 'S12 - Typha latifolia swamp' },
    { dataName: '21001', title: 'S13 - Typha angustifolia swamp' },
    { dataName: '21002', title: 'S14 - Sparganium erectum swamp' },
    { dataName: '21003', title: 'S15 - Acorus calamus swamp' },
    { dataName: '21004', title: 'S16 - Sagittaria sagittifolia swamp' },
    { dataName: '21005', title: 'S17 - Carex pseudocyperus swamp' },
    { dataName: '21006', title: 'S18 - Carex otrubae swamp' },
    { dataName: '21007', title: 'S19 - Eleocharis palustris swamp' },
    { dataName: '20997', title: 'S1 - Carex elata swamp' },
    {
      dataName: '21009',
      title: 'S20 - Scirpus lacustris ssp. tabernaemontani swamp',
    },
    { dataName: '21010', title: 'S21 - Scirpus maritimus swamp' },
    {
      dataName: '21011',
      title: 'S22 - Glyceria fluitans water-margin vegetation',
    },
    { dataName: '21012', title: 'S23 - Other water-margin vegetation' },
    {
      dataName: '21013',
      title: 'S24 - Phragmites australis-Peucedanum palustris tall-herb fen',
    },
    {
      dataName: '21014',
      title: 'S25 - Phragmites australis-Eupatorium cannabinum tall-herb fen',
    },
    {
      dataName: '21015',
      title: 'S26 - Phragmites australis-Urtica dioica tall-herb fen',
    },
    {
      dataName: '21016',
      title: 'S27 - Carex rostrata-Potentilla palustris tall-herb fen',
    },
    {
      dataName: '21017',
      title: 'S28 - Phalaris arundinacea tall-herb fen',
    },
    {
      dataName: '21008',
      title: 'S2 - Cladium mariscus swamp and sedge-beds',
    },
    { dataName: '21018', title: 'S3 - Carex paniculata swamp' },
    {
      dataName: '21019',
      title: 'S4 - Phragmites australis swamp and reed-beds',
    },
    { dataName: '21020', title: 'S5 - Glyceria maxima swamp' },
    { dataName: '21021', title: 'S6 - Carex riparia swamp' },
    { dataName: '21022', title: 'S7 - Carex acutiformis swamp' },
    {
      dataName: '21023',
      title: 'S8 - Scirpus lacustris ssp. lacustris swamp',
    },
    { dataName: '21024', title: 'S9 - Carex rostrata swamp' },
    {
      dataName: '21026',
      title: 'SD10 - Carex arenaria dune community',
    },
    {
      dataName: '21027',
      title: 'SD11 - Carex arenaria-Cornicularia aculeata dune community',
    },
    {
      dataName: '21028',
      title:
        'SD12 - Carex arenaria-Festuca ovina-Agrostis capillaris dune grassland',
    },
    {
      dataName: '21029',
      title: 'SD13 - Sagina nodosa-Bryum pseudotriquetrum dune-slack community',
    },
    {
      dataName: '21030',
      title: 'SD14 - Salix repens-Campylium stellatum dune-slack community',
    },
    {
      dataName: '21031',
      title: 'SD15 - Salix repens-Calliergon cuspidatum dune-slack community',
    },
    {
      dataName: '21032',
      title: 'SD16 - Salix repens-Holcus lanatus dune-slack community',
    },
    {
      dataName: '21033',
      title: 'SD17 - Potentilla anserina-Carex nigra dune-slack community',
    },
    {
      dataName: '21034',
      title: 'SD18 - Hippophae rhamnoides dune scrub',
    },
    {
      dataName: '21035',
      title:
        'SD19 - Phleum arenarium-Arenaria serpyllifolia dune annual community',
    },
    {
      dataName: '21025',
      title: 'SD1 - Rumex crispus-Glaucium flavum shingle community',
    },
    {
      dataName: '21036',
      title: 'SD2 - Honkenya peploides-Cakile maritima strandline community',
    },
    {
      dataName: '21037',
      title: 'SD3 - Matricaria maritima-Galium aparine strandline community',
    },
    {
      dataName: '21038',
      title: 'SD4 - Elymus farctus ssp. boreali-atlanticus foredune community',
    },
    {
      dataName: '21039',
      title: 'SD5 - Leymus arenarius mobile dune community',
    },
    {
      dataName: '21040',
      title: 'SD6 - Ammophila arenaria mobile dune community',
    },
    {
      dataName: '21041',
      title: 'SD7 - Ammophila arenaria-Festuca rubra semi-fixed dune community',
    },
    {
      dataName: '21042',
      title: 'SD8 - Festuca rubra-Galium verum fixed dune grassland',
    },
    {
      dataName: '21043',
      title: 'SD9 - Ammophila arenaria-Arrhenatherum elatius dune grassland',
    },
    {
      dataName: '21045',
      title:
        'SM10 - Transitional low-marsh vegetation with Puccinellia maritima -  annual Salicornia species and Suaeda maritima',
    },
    {
      dataName: '21046',
      title: 'SM11 - Aster tripolium var. discoideus salt-marsh community',
    },
    { dataName: '21047', title: 'SM12 - Rayed Aster tripolium stands' },
    {
      dataName: '21048',
      title: 'SM13 - Puccinellia maritima salt-marsh community',
    },
    {
      dataName: '21049',
      title: 'SM14 - Halimione portulacoides salt-marsh community',
    },
    {
      dataName: '21050',
      title: 'SM15 - Juncus maritimus-Triglochin maritima salt-marsh community',
    },
    {
      dataName: '21051',
      title: 'SM16 - Festuca rubra salt-marsh community',
    },
    {
      dataName: '21052',
      title: 'SM17 - Artemisia maritima salt-marsh community',
    },
    {
      dataName: '21053',
      title: 'SM18 - Juncus maritimus salt-marsh community',
    },
    {
      dataName: '21054',
      title: 'SM19 - Blysmus rufus salt-marsh community',
    },
    { dataName: '21044', title: 'SM1 - Zostera communities' },
    {
      dataName: '21056',
      title: 'SM20 - Eleocharis uniglumis salt-marsh community',
    },
    {
      dataName: '21057',
      title: 'SM21 - Suaeda vera-Limonium binervosum salt-marsh community',
    },
    {
      dataName: '21058',
      title:
        'SM22 - Halimione portulacoides-Frankenia laevis salt-marsh community',
    },
    {
      dataName: '21059',
      title:
        'SM23 - Spergularia marina-Puccinellia distans salt-marsh community',
    },
    {
      dataName: '21060',
      title: 'SM24 - Elymus pycnanthus salt-marsh community',
    },
    {
      dataName: '21061',
      title: 'SM25 - Suaeda vera drift-line community',
    },
    { dataName: '21062', title: 'SM26 - Inula crithmoides stands' },
    {
      dataName: '21063',
      title: 'SM28 - Elymus repens salt-marsh community',
    },
    {
      dataName: '21055',
      title: 'SM2 - Ruppia maritima salt-marsh community',
    },
    {
      dataName: '21064',
      title: 'SM3 - Eleocharis parvula salt-marsh community',
    },
    {
      dataName: '21065',
      title: 'SM4 - Spartina maritima salt-marsh community',
    },
    {
      dataName: '21066',
      title: 'SM5 - Spartina alterniflora salt-marsh community',
    },
    {
      dataName: '21067',
      title: 'SM6 - Spartina anglica salt-marsh community',
    },
    { dataName: '21068', title: 'SM7 - Arthrocnemum perenne stands' },
    {
      dataName: '21069',
      title: 'SM8 - Annual Salicornia salt-marsh community',
    },
    {
      dataName: '21070',
      title: 'SM9 - Suaeda maritima salt-marsh community',
    },
    {
      dataName: '21072',
      title: 'U10 - Carex bigelowii-Racomitrium lanuginosum moss-heath',
    },
    {
      dataName: '21073',
      title: 'U11 - Polytrichum sexangulare-Kiaeria starkei snow-bed',
    },
    {
      dataName: '21074',
      title: 'U12 - Salix herbacea-Racomitrium heterostichum snow-bed',
    },
    {
      dataName: '21075',
      title: 'U13 - Deschampsia cespitosa-Galium saxatile grassland',
    },
    {
      dataName: '21076',
      title:
        'U14 - Alchemilla alpina-Sibbaldia procumbens dwarf-herb community',
    },
    {
      dataName: '21077',
      title: 'U15 - Saxifraga aizoides-Alchemilla glabra banks',
    },
    {
      dataName: '21078',
      title: 'U16 - Luzula sylvatica-Vaccinium myrtillus tall-herb community',
    },
    {
      dataName: '21079',
      title: 'U17 - Luzula sylvatica-Geum rivale tall-herb community',
    },
    {
      dataName: '21080',
      title: 'U18 - Cryptogramma crispa-Athyrium distentifolium snow-bed',
    },
    {
      dataName: '21081',
      title: 'U19 - Thelypteris limbosperma-Blechnum spicant community',
    },
    {
      dataName: '21071',
      title:
        'U1 - Festuca ovina-Agrostis capillaris-Rumex acetosella grassland',
    },
    {
      dataName: '21083',
      title: 'U20 - Pteridium aquilinum-Galium saxatile community',
    },
    {
      dataName: '21084',
      title: 'U21 - Cryptogramma crispa-Deschampsia flexuosa community',
    },
    { dataName: '21082', title: 'U2 - Deschampsia flexuosa grassland' },
    { dataName: '21085', title: 'U3 - Agrostis curtisii grassland' },
    {
      dataName: '21086',
      title: 'U4 - Festuca ovina-Agrostis capillaris-Galium saxatile grassland',
    },
    {
      dataName: '21087',
      title: 'U5 - Nardus stricta-Galium saxatile grassland',
    },
    {
      dataName: '21088',
      title: 'U6 - Juncus squarrosus-Festuca ovina grassland',
    },
    {
      dataName: '21089',
      title: 'U7 - Nardus stricta-Carex bigelowii grass-heath',
    },
    {
      dataName: '21090',
      title: 'U8 - Carex bigelowii-Polytrichum alpinum sedge-heath',
    },
    {
      dataName: '21091',
      title: 'U9 - Juncus trifidus-Racomitrium lanuginosum rush-heath',
    },
    {
      dataName: '21093',
      title:
        'W10 - Quercus robur-Pteridium aquilinum-Rubus fruticosus woodland',
    },
    {
      dataName: '21094',
      title:
        'W11 - Quercus petraea-Betula pubescens-Oxalis acetosella woodland',
    },
    {
      dataName: '21095',
      title: 'W12 - Fagus sylvatica-Mercurialis perennis woodland',
    },
    { dataName: '21096', title: 'W13 - Taxus baccata woodland' },
    {
      dataName: '21097',
      title: 'W14 - Fagus sylvatica-Rubus fruticosus woodland',
    },
    {
      dataName: '21098',
      title: 'W15 - Fagus sylvatica-Deschampsia flexuosa woodland',
    },
    {
      dataName: '21099',
      title: 'W16 - Quercus spp.-Betula spp.-Deschampsia flexuosa woodland',
    },
    {
      dataName: '21100',
      title: 'W17 - Quercus petraea-Betula pubescens-Dicranum majus woodland',
    },
    {
      dataName: '21101',
      title: 'W18 - Pinus sylvestris-Hylocomium splendens woodland',
    },
    {
      dataName: '21102',
      title:
        'W19 - Juniperus communis ssp. communis-Oxalis acetosella woodland',
    },
    {
      dataName: '21092',
      title: 'W1 - Salix cinerea-Galium palustre woodland',
    },
    {
      dataName: '21104',
      title: 'W20 - Salix lapponum-Luzula sylvatica scrub',
    },
    {
      dataName: '21105',
      title: 'W21 - Crataegus monogyna-Hedera helix scrub',
    },
    {
      dataName: '21106',
      title: 'W22 - Prunus spinosa-Rubus fruticosus scrub',
    },
    {
      dataName: '21107',
      title: 'W23 - Ulex europaeus-Rubus fruticosus scrub',
    },
    {
      dataName: '21108',
      title: 'W24 - Rubus fruticosus-Holcus lanatus underscrub',
    },
    {
      dataName: '21109',
      title: 'W25 - Pteridium aquilinum-Rubus fruticosus underscrub',
    },
    {
      dataName: '21103',
      title:
        'W2 - Salix cinerea-Betula pubescens-Phragmites australis woodland',
    },
    {
      dataName: '21110',
      title: 'W3 - Salix pentandra-Carex rostrata woodland',
    },
    {
      dataName: '21111',
      title: 'W4 - Betula pubescens-Molinia caerulea woodland',
    },
    {
      dataName: '21112',
      title: 'W5 - Alnus glutinosa-Carex paniculata woodland',
    },
    {
      dataName: '21113',
      title: 'W6 - Alnus glutinosa-Urtica dioica woodland',
    },
    {
      dataName: '21114',
      title:
        'W7 - Alnus glutinosa-Fraxinus excelsior-Lysimachia nemorum woodland',
    },
    {
      dataName: '21115',
      title:
        'W8 - Fraxinus excelsior-Acer campestre-Mercurialis perennis woodland',
    },
    {
      dataName: '21116',
      title:
        'W9 - Fraxinus excelsior-Sorbus aucuparia-Mercurialis perennis woodland',
    },
  ],
} as const;

export const habitatDescriptionAttr = {
  id: 'smpAttr:1637',
  type: 'textInput',
  title: 'Habitat description',
  appearance: 'multiline',
} as const;

export const dominCoverAttr = {
  id: 'occAttr:214',
  type: 'choiceInput',
  container: 'inline',
  choices: dominCoverValues,
} as const;

export const bbCoverAttr = {
  id: 'occAttr:890',
  type: 'choiceInput',
  container: 'inline',
  choices: bbCoverValues,
} as const;

export const presenceCoverAttr = {
  id: 'occAttr:894',
  type: 'choiceInput',
  container: 'inline',
  choices: presenceCoverValues,
} as const;

export const percentageCoverAttr = {
  id: 'occAttr:891',
  type: 'numberInput',
  title: 'Percentage',
  appearance: 'counter',
  validations: { min: 1, max: 100 },
} as const;

export const frequencyCoverAttr = {
  id: 'occAttr:893',
  type: 'numberInput',
  title: 'Cell frequency',
  appearance: 'counter',
  validations: { min: 0, max: 1 },
} as const;

export const countCoverAttr = {
  id: 'occAttr:892',
  type: 'numberInput',
  title: 'Count',
  appearance: 'counter',
  validations: { min: 1, max: 1000 },
} as const;

export const getCover = (model: Occurrence) => {
  const findLabel = (choices: Choice[], val: any) => {
    const byValue = (choice: Choice) => choice.dataName === val;
    return choices.find(byValue)?.title;
  };

  switch (model.parent?.data[abundanceAttr.id]) {
    case '18881':
      return findLabel(dominCoverAttr.choices, model.data[dominCoverAttr.id]);
    case '18882':
      return findLabel(bbCoverAttr.choices, model.data[bbCoverAttr.id]);
    case '18883':
      return model.data[percentageCoverAttr.id];
    case '18884':
      return model.data[countCoverAttr.id];
    case '18885':
      return model.data[frequencyCoverAttr.id];
    case '18892':
      return findLabel(
        presenceCoverAttr.choices,
        model.data[presenceCoverAttr.id]
      );
    default:
      return null;
  }
};

export const plotGroupAttr = (data?: Data) => {
  const plotGroups: any = {};
  locations
    .filter(bySurvey('standard'))
    .filter(byGroup(data?.[groupAttr().id]))
    .forEach((location: Location) => {
      if (!location.data.plotGroupIdsAndNamesForPlot) return;
      Object.assign(plotGroups, location.data.plotGroupIdsAndNamesForPlot);
    });

  const getOption = ([value, title]: any) => ({ dataName: value, title });

  const choices = Object.entries(plotGroups).map(getOption);
  const none = { dataName: null, title: 'All' };
  choices.push(none);

  return {
    id: 'plotGroupId',
    type: 'choiceInput',
    title: 'Plot group',
    prefix: locationOutlineIcon,
    container: 'page',
    choices,
  } as const;
};

const canopyAttr = {
  id: 'smpAttr:1624',
};

const survey: Survey = {
  id: STANDARD_SURVEY_ID,
  name: 'standard',
  label: 'Standard',

  attrs: {
    ...blockToAttr(locationAttr),
    ...blockToAttr(groupAttr),
    ...blockToAttr(plotGroupAttr),
    ...blockToAttr(speciesCommentsAttr),
    ...blockToAttr(recorderAttr),
    ...blockToAttr(abundanceAttr),
    ...blockToAttr(managementAttr),
    ...blockToAttr(managementOtherAttr),
    ...blockToAttr(grazingAttr),
    ...blockToAttr(grazingAnimalsAttr),
    ...blockToAttr(grazingAnimalNumberAttr),
    ...blockToAttr(communityAttr),
    ...blockToAttr(habitatDescriptionAttr),
    ...blockToAttr(soilAttr),
    ...blockToAttr(woodCoverAttr),
    ...blockToAttr(rockCoverAttr),
    ...blockToAttr(litterAttr),
    ...blockToAttr(lichensAttr),
  },

  occ: {
    attrs: {
      ...blockToAttr(gridAttr),
      ...blockToAttr(dominCoverAttr),
      ...blockToAttr(bbCoverAttr),
      ...blockToAttr(presenceCoverAttr),
      ...blockToAttr(percentageCoverAttr),
      ...blockToAttr(frequencyCoverAttr),
      ...blockToAttr(countCoverAttr),
    },

    create: ({ Occurrence: AppOccurrence, taxon, grid }) =>
      new AppOccurrence({ data: { ...taxon, [gridAttr.id]: grid } }),

    verify: (_, model) =>
      object({
        cover: z.union([z.string(), z.number()], {
          error: 'Cover is missing',
        }),
      }).safeParse({ cover: getCover(model) }).error,
  },

  create({ Sample }) {
    const sample = new Sample({
      metadata: {
        survey: survey.name,
      },
      data: {
        surveyId: survey.id,
        date: new Date().toISOString().split('T')[0],
        recorderNames: userModel.getPrettyName(),
        [canopyAttr.id]: true,
        training: appModel.data.useTraining,
      },
    });

    return sample;
  },

  verify: data =>
    object({
      date: z.string(),
      locationId: z.string({ error: 'Location is missing' }),
    }).safeParse(data).error,
};

export default survey;
