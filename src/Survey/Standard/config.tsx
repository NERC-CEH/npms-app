/* eslint-disable no-param-reassign */
import { listOutline, locationOutline, peopleOutline } from 'ionicons/icons';
import { z, object } from 'zod';
import { Choice } from '@flumens/tailwind/dist/Survey';
import { IonIcon } from '@ionic/react';
import locations, { bySurvey } from 'common/models/collections/locations';
import Location from 'common/models/location';
import Occurrence from 'common/models/occurrence';
import { Attrs } from 'common/models/sample';
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
  { title: '+,<1%', data_name: '18886' },
  { title: '1,1-5%', data_name: '18887' },
  { title: '2,6-25%', data_name: '18888' },
  { title: '3,26-50%', data_name: '18889' },
  { title: '4,51-75%', data_name: '18890' },
  { title: '5,76-100%', data_name: '18891' },
];

export const presenceCoverValues = [
  { title: 'Present', data_name: '18893' },
  { title: 'Absent', data_name: '18894' },
];

export const abundanceAttr = {
  id: 'smpAttr:1625',
  type: 'choice_input',
  title: 'Abundance type',
  prefix: peopleOutlineIcon,
  appearance: 'button',
  choices: [
    { title: 'Domin', data_name: '18881' },
    { title: 'Braun-Blanquet', data_name: '18882' },
    { title: 'Percentage', data_name: '18883' },
    { title: 'Individual plant count', data_name: '18884' },
    { title: 'Cell frequency', data_name: '18885' },
    { title: 'Present/Absent', data_name: '18892' },
  ],
} as const;

export const speciesCommentsAttr = {
  id: 'smpAttr:1796',
  type: 'text_input',
  title: 'Species comments',
  appearance: 'multiline',
} as const;

export const vegetationHeight1Attr = {
  id: 'smpAttr:1626',
  type: 'number_input',
  title: 'Vegetation height 1',
  appearance: 'counter',
  validations: { min: 0 },
} as const;

export const vegetationHeight2Attr = {
  id: 'smpAttr:1627',
  type: 'number_input',
  title: 'Vegetation height 2',
  appearance: 'counter',
  validations: { min: 0 },
} as const;

export const vegetationHeight3Attr = {
  id: 'smpAttr:1628',
  type: 'number_input',
  title: 'Vegetation height 3',
  appearance: 'counter',
  validations: { min: 0 },
} as const;

export const vegetationHeight4Attr = {
  id: 'smpAttr:1629',
  type: 'number_input',
  title: 'Vegetation height 4',
  appearance: 'counter',
  validations: { min: 0 },
} as const;

export const vegetationHeight5Attr = {
  id: 'smpAttr:1630',
  type: 'number_input',
  title: 'Vegetation height 5',
  appearance: 'counter',
  validations: { min: 0 },
} as const;

export const vegetationHeightAverageAttr = {
  id: 'smpAttr:1748',
  type: 'number_input',
  title: 'Vegetation height average',
  appearance: 'counter',
  validations: { min: 0 },
} as const;

export const vegetationHeightComment = {
  id: 'smpAttr:1631',
  type: 'text_input',
  title: 'Vegetation height comment',
  appearance: 'multiline',
} as const;

export const partialSampleAttr = {
  id: 'smpAttr:1636',
  type: 'choice_input',
  title: 'Partial sample (vascular plants)',
  prefix: listOutlineIcon,
  appearance: 'button',
  choices: [
    { title: 'Yes', data_name: '18898' },
    { title: 'No', data_name: '18899' },
  ],
} as const;

export const bryophytesRecordedAttr = {
  id: 'smpAttr:1632',
  type: 'choice_input',
  title: 'Bryophytes recorded',
  prefix: listOutlineIcon,
  appearance: 'button',
  choices: [
    { title: 'All', data_name: '18895' },
    { title: 'Some', data_name: '18896' },
    { title: 'None', data_name: '18897' },
  ],
} as const;

export const lichensRecordedAttr = {
  id: 'smpAttr:1633',
  type: 'choice_input',
  title: 'Lichens recorded',
  prefix: listOutlineIcon,
  appearance: 'button',
  choices: [
    { title: 'All', data_name: '18895' },
    { title: 'Some', data_name: '18896' },
    { title: 'None', data_name: '18897' },
  ],
} as const;

export const fungiRecordedAttr = {
  id: 'smpAttr:1634',
  type: 'choice_input',
  title: 'Fungi recorded',
  prefix: listOutlineIcon,
  appearance: 'button',
  choices: [
    { title: 'All', data_name: '18895' },
    { title: 'Some', data_name: '18896' },
    { title: 'None', data_name: '18897' },
  ],
} as const;

export const algaeRecordedAttr = {
  id: 'smpAttr:1635',
  type: 'choice_input',
  title: 'Algae recorded',
  prefix: listOutlineIcon,
  appearance: 'button',
  choices: [
    { title: 'All', data_name: '18895' },
    { title: 'Some', data_name: '18896' },
    { title: 'None', data_name: '18897' },
  ],
} as const;

export const grazingAnimalNumberAttr = {
  id: 'smpAttr:1747',
  type: 'number_input',
  title: 'Grazing animal numbers',
  validations: { min: 1, required: true },
  appearance: 'counter',
  prefix: listOutlineIcon,
} as const;

export const communityAttr = {
  id: 'smpAttr:1770',
  type: 'choice_input',
  title: 'Community',
  prefix: listOutlineIcon,
  container: 'page',
  choices: [
    { data_name: '20836', title: 'A10 - Polygonum amphibium community' },
    {
      data_name: '20837',
      title: 'A11 - Potamogeton pectinatus-Myriophyllum spicatum community',
    },
    {
      data_name: '20838',
      title: 'A12 - Potamogeton pectinatus community',
    },
    {
      data_name: '20839',
      title:
        'A13 - Potamogeton perfoliatus-Myriophyllum alterniflorum community',
    },
    {
      data_name: '20840',
      title: 'A14 - Myriophyllum alterniflorum community',
    },
    { data_name: '20841', title: 'A15 - Elodea canadensis community' },
    {
      data_name: '20842',
      title: 'A16 - Callitriche stagnalis community',
    },
    {
      data_name: '20843',
      title: 'A17 - Ranunculus penicillatus ssp. pseudofluitans community',
    },
    { data_name: '20844', title: 'A18 - Ranunculus fluitans community' },
    {
      data_name: '20845',
      title: 'A19 - Ranunculus aquatilis community',
    },
    { data_name: '20835', title: 'A1 - Lemna gibba community' },
    { data_name: '20847', title: 'A20 - Ranunculus peltatus community' },
    { data_name: '20848', title: 'A21 - Ranunculus baudotii community' },
    {
      data_name: '20849',
      title: 'A22 - Littorella uniflora-Lobelia dortmanna community',
    },
    {
      data_name: '20850',
      title: 'A23 - Isoetes lacustris/setacea community',
    },
    { data_name: '20851', title: 'A24 - Juncus bulbosus community' },
    { data_name: '20846', title: 'A2 - Lemna minor community' },
    {
      data_name: '20852',
      title: 'A3 - Spirodela polyrhiza-Hydrocharis morsus-ranae community',
    },
    {
      data_name: '20853',
      title: 'A4 - Hydrocharis morsus-ranae-Stratiotes aloides community',
    },
    {
      data_name: '20854',
      title: 'A5 - Ceratophyllum demersum community',
    },
    { data_name: '20855', title: 'A7 - Nymphaea alba community' },
    { data_name: '20856', title: 'A8 - Nuphar lutea community' },
    { data_name: '20857', title: 'A9 - Potamogeton natans community' },
    {
      data_name: '20859',
      title:
        'CG10 - Festuca ovina-Agrostis capillaris-Thymus praecox grassland',
    },
    {
      data_name: '20860',
      title:
        'CG11 - Festuca ovina-Agrostis capillaris-Alchemilla alpina grass-heath',
    },
    {
      data_name: '20861',
      title:
        'CG12 - Festuca ovina-Alchemilla alpina-Silene acaulis dwarf-herb community',
    },
    {
      data_name: '20862',
      title: 'CG13 - Dryas octopetala-Carex flacca heath',
    },
    {
      data_name: '20863',
      title: 'CG14 - Dryas octopetala-Silene acaulis ledge community',
    },
    {
      data_name: '20858',
      title: 'CG1 - Festuca ovina-Carlina vulgaris grassland',
    },
    {
      data_name: '20864',
      title: 'CG2 - Festuca ovina-Avenula pratensis grassland',
    },
    { data_name: '20865', title: 'CG3 - Bromus erectus grassland' },
    {
      data_name: '20866',
      title: 'CG4 - Brachypodium pinnatum grassland',
    },
    {
      data_name: '20867',
      title: 'CG5 - Bromus erectus-Brachypodium pinnatum grassland',
    },
    { data_name: '20868', title: 'CG6 - Avenula pubescens grassland' },
    {
      data_name: '20869',
      title:
        'CG7 - Festuca ovina-Hieracium pilosella-Thymus praecox/pulegioides grassland',
    },
    {
      data_name: '20870',
      title: 'CG8 - Sesleria albicans-Scabiosa columbaria grassland',
    },
    {
      data_name: '20871',
      title: 'CG9 - Sesleria albicans-Galium sterneri grassland',
    },
    {
      data_name: '20873',
      title: 'H10 - Calluna vulgaris-Erica cinerea heath',
    },
    {
      data_name: '20874',
      title: 'H11 - Calluna vulgaris-Carex arenaria heath',
    },
    {
      data_name: '20875',
      title: 'H12 - Calluna vulgaris-Vaccinium myrtillus heath',
    },
    {
      data_name: '20876',
      title: 'H13 - Calluna vulgaris-Cladonia arbuscula heath',
    },
    {
      data_name: '20877',
      title: 'H14 - Calluna vulgaris-Racomitrium lanuginosum heath',
    },
    {
      data_name: '20878',
      title: 'H15 - Calluna vulgaris-Juniperus communis ssp. nana heath',
    },
    {
      data_name: '20879',
      title: 'H16 - Calluna vulgaris-Arctostaphylos uva-ursi heath',
    },
    {
      data_name: '20880',
      title: 'H17 - Calluna vulgaris-Arctostaphylos alpinus heath',
    },
    {
      data_name: '20881',
      title: 'H18 - Vaccinium myrtillus-Deschampsia flexuosa heath',
    },
    {
      data_name: '20882',
      title: 'H19 - Vaccinium myrtillus-Cladonia arbuscula heath',
    },
    {
      data_name: '20872',
      title: 'H1 - Calluna vulgaris-Festuca ovina heath',
    },
    {
      data_name: '20884',
      title: 'H20 - Vaccinium myrtillus-Racomitrium lanuginosum heath',
    },
    {
      data_name: '20885',
      title:
        'H21 - Calluna vulgaris-Vaccinium myrtillus-Sphagnum capillifolium heath',
    },
    {
      data_name: '20886',
      title: 'H22 - Vaccinium myrtillus-Rubus chamaemorus heath',
    },
    {
      data_name: '20883',
      title: 'H2 - Calluna vulgaris-Ulex minor heath',
    },
    {
      data_name: '20887',
      title: 'H3 - Ulex minor-Agrostis curtisii heath',
    },
    {
      data_name: '20888',
      title: 'H4 - Ulex gallii-Agrostis curtisii heath',
    },
    {
      data_name: '20889',
      title: 'H5 - Erica vagans-Schoenus nigricans heath',
    },
    {
      data_name: '20890',
      title: 'H6 - Erica vagans-Ulex europaeus heath',
    },
    {
      data_name: '20891',
      title: 'H7 - Calluna vulgaris-Scilla verna heath',
    },
    {
      data_name: '20892',
      title: 'H8 - Calluna vulgaris-Ulex gallii heath',
    },
    {
      data_name: '20893',
      title: 'H9 - Calluna vulgaris-Deschampsia flexuosa heath',
    },
    {
      data_name: '20895',
      title: 'M10 - Carex dioica-Pinguicula vulgaris mire',
    },
    {
      data_name: '20896',
      title: 'M11 - Carex demissa-Saxifraga aizoides mire',
    },
    { data_name: '20897', title: 'M12 - Carex saxatilis mire' },
    {
      data_name: '20898',
      title: 'M13 - Schoenus nigricans-Juncus subnodulosus mire',
    },
    {
      data_name: '20899',
      title: 'M14 - Schoenus nigricans-Narthecium ossifragum mire',
    },
    {
      data_name: '20900',
      title: 'M15 - Scirpus cespitosus-Erica tetralix wet heath',
    },
    {
      data_name: '20901',
      title: 'M16 - Erica tetralix-Sphagnum compactum wet heath',
    },
    {
      data_name: '20902',
      title: 'M17 - Scirpus cespitosus-Eriophorum vaginatum blanket mire',
    },
    {
      data_name: '20903',
      title: 'M18 - Erica tetralix-Sphagnum papillosum raised and blanket mire',
    },
    {
      data_name: '20904',
      title: 'M19 - Calluna vulgaris-Eriophorum vaginatum blanket mire',
    },
    {
      data_name: '20894',
      title: 'M1 - Sphagnum auriculatum bog pool community',
    },
    {
      data_name: '20906',
      title: 'M20 - Eriophorum vaginatum blanket and raised mire',
    },
    {
      data_name: '20907',
      title: 'M21 - Narthecium ossifragum-Sphagnum papillosum valley mire',
    },
    {
      data_name: '20908',
      title: 'M22 - Juncus subnodulosus-Cirsium palustre fen-meadow',
    },
    {
      data_name: '20909',
      title: 'M23 - Juncus effusus/acutiflorus-Galium palustre rush-pasture',
    },
    {
      data_name: '20910',
      title: 'M24 - Molinia caerulea-Cirsium dissectum fen-meadow',
    },
    {
      data_name: '20911',
      title: 'M25 - Molinia caerulea-Potentilla erecta mire',
    },
    {
      data_name: '20912',
      title: 'M26 - Molinia caerulea-Crepis paludosa mire',
    },
    {
      data_name: '20913',
      title: 'M27 - Filipendula ulmaria-Angelica sylvestris mire',
    },
    {
      data_name: '20914',
      title: 'M28 - Iris pseudacorus-Filipendula ulmaria mire',
    },
    {
      data_name: '20915',
      title: 'M29 - Hypericum elodes-Potamogeton polygonifolius soakway',
    },
    {
      data_name: '20905',
      title: 'M2 - Sphagnum cuspidatum/recurvum bog pool community',
    },
    {
      data_name: '20917',
      title: 'M31 - Anthelia julacea-Sphagnum auriculatum spring',
    },
    {
      data_name: '20918',
      title: 'M32 - Philonotis fontana-Saxifraga stellaris spring',
    },
    {
      data_name: '20919',
      title: 'M33 - Pohlia wahlenbergii var. glacialis spring',
    },
    {
      data_name: '20920',
      title: 'M34 - Carex demissa-Koenigia islandica flush',
    },
    {
      data_name: '20921',
      title: 'M35 - Ranunculus omiophyllus-Montia fontana rill',
    },
    {
      data_name: '20922',
      title: 'M37 - Cratoneuron commutatum-Festuca rubra spring',
    },
    {
      data_name: '20923',
      title: 'M38 - Cratoneuron commutatum-Carex nigra spring',
    },
    {
      data_name: '20916',
      title: 'M3 - Eriophorum angustifolium bog pool community',
    },
    {
      data_name: '20924',
      title: 'M4 - Carex rostrata-Sphagnum recurvum mire',
    },
    {
      data_name: '20925',
      title: 'M5 - Carex rostrata-Sphagnum squarrosum mire',
    },
    {
      data_name: '20926',
      title: 'M6 - Carex echinata-Sphagnum recurvum/auriculatum mire',
    },
    {
      data_name: '20927',
      title: 'M7 - Carex curta-Sphagnum russowii mire',
    },
    {
      data_name: '20928',
      title: 'M8 - Carex rostrata-Sphagnum warnstorfii mire',
    },
    {
      data_name: '20929',
      title: 'M9 - Carex rostrata-Calliergon cuspidatum/giganteum mire',
    },
    {
      data_name: '20931',
      title: 'MC10 - Festuca rubra-Plantago spp. maritime grassland',
    },
    {
      data_name: '20932',
      title:
        'MC11 - Festuca rubra-Daucus carota ssp. gummifer maritime grassland',
    },
    {
      data_name: '20933',
      title:
        'MC12 - Festuca rubra-Hyacinthoides non-scripta maritime bluebell community',
    },
    {
      data_name: '20930',
      title:
        'MC1 - Crithmum maritimum-Spergularia rupicola maritime rock-crevice community',
    },
    {
      data_name: '20934',
      title:
        'MC2 - Armeria maritima-Ligusticum scoticum maritime rock-crevice community',
    },
    {
      data_name: '20935',
      title:
        'MC3 - Rhodiola rosea-Armeria maritima maritime cliff-ledge community',
    },
    {
      data_name: '20936',
      title: 'MC4 - Brassica oleracea maritime cliff-ledge community',
    },
    {
      data_name: '20937',
      title:
        'MC5 - Armeria maritima-Cerastium diffusum ssp. diffusum maritime therophyte community',
    },
    {
      data_name: '20938',
      title:
        'MC6 - Atriplex prostrata-Beta vulgaris ssp. maritima sea-bird cliff community',
    },
    {
      data_name: '20939',
      title: 'MC7 - Stellaria media-Rumex acetosa sea-bird cliff community',
    },
    {
      data_name: '20940',
      title: 'MC8 - Festuca rubra-Armeria maritima maritime grassland',
    },
    {
      data_name: '20941',
      title: 'MC9 - Festuca rubra-Holcus lanatus maritime grassland',
    },
    {
      data_name: '20943',
      title: 'MG10 - Holcus lanatus-Juncus effusus rush-pasture',
    },
    {
      data_name: '20944',
      title:
        'MG11 - Festuca rubra-Agrostis stolonifera-Potentilla anserina grassland',
    },
    {
      data_name: '20945',
      title: 'MG12 - Festuca arundinacea grassland',
    },
    {
      data_name: '20946',
      title: 'MG13 - Agrostis stolonifera-Alopecurus geniculatus grassland',
    },
    {
      data_name: '20942',
      title: 'MG1 - Arrhenatherum elatius grassland',
    },
    {
      data_name: '20947',
      title:
        'MG2 - Arrhenatherum elatius-Filipendula ulmaria tall-herb grassland',
    },
    {
      data_name: '20948',
      title: 'MG3 - Anthoxanthum odoratum-Geranium sylvaticum grassland',
    },
    {
      data_name: '20949',
      title: 'MG4 - Alopecurus pratensis-Sanguisorba officinalis grassland',
    },
    {
      data_name: '20950',
      title: 'MG5 - Cynosurus cristatus-Centaurea nigra grassland',
    },
    {
      data_name: '20951',
      title: 'MG6 - Lolium perenne-Cynosurus cristatus grassland',
    },
    {
      data_name: '20952',
      title: 'MG7 - Lolium perenne leys and related grasslands',
    },
    {
      data_name: '20953',
      title: 'MG8 - Cynosurus cristatus-Caltha palustris grassland',
    },
    {
      data_name: '20954',
      title: 'MG9 - Holcus lanatus-Deschampsia cespitosa grassland',
    },
    {
      data_name: '20956',
      title: 'OV10 - Poa annua-Senecio vulgaris community',
    },
    {
      data_name: '20957',
      title: 'OV11 - Poa annua-Stachys arvensis community',
    },
    {
      data_name: '20958',
      title: 'OV12 - Poa annua-Myosotis arvensis community',
    },
    {
      data_name: '20959',
      title: 'OV13 - Stellaria media-Capsella bursa-pastoris community',
    },
    {
      data_name: '20960',
      title: 'OV14 - Urtica urens-Lamium amplexicaule community',
    },
    {
      data_name: '20961',
      title: 'OV15 - Anagallis arvensis-Veronica persica community',
    },
    {
      data_name: '20962',
      title: 'OV16 - Papaver rhoeas-Silene noctiflora community',
    },
    {
      data_name: '20963',
      title: 'OV17 - Reseda lutea-Polygonum aviculare community',
    },
    {
      data_name: '20964',
      title: 'OV18 - Polygonum aviculare-Chamomilla suaveolens community',
    },
    {
      data_name: '20965',
      title: 'OV19 - Poa annua-Matricaria perforata community',
    },
    {
      data_name: '20955',
      title: 'OV1 - Viola arvensis-Aphanes microcarpa community',
    },
    {
      data_name: '20967',
      title: 'OV20 - Poa annua-Sagina procumbens community',
    },
    {
      data_name: '20968',
      title: 'OV21 - Poa annua-Plantago major community',
    },
    {
      data_name: '20969',
      title: 'OV22 - Poa annua-Taraxacum officinale community',
    },
    {
      data_name: '20970',
      title: 'OV23 - Lolium perenne-Dactylis glomerata community',
    },
    {
      data_name: '20971',
      title: 'OV24 - Urtica dioica-Galium aparine community',
    },
    {
      data_name: '20972',
      title: 'OV25 - Urtica dioica-Cirsium arvense community',
    },
    { data_name: '20973', title: 'OV26 - Epilobium hirsutum community' },
    {
      data_name: '20974',
      title: 'OV27 - Epilobium angustifolium community',
    },
    {
      data_name: '20975',
      title: 'OV28 - Agrostis stolonifera-Ranunculus repens community',
    },
    {
      data_name: '20976',
      title: 'OV29 - Alopecurus geniculatus-Rorippa palustris community',
    },
    {
      data_name: '20966',
      title: 'OV2 - Briza minor-Silene gallica community',
    },
    {
      data_name: '20978',
      title: 'OV30 - Bidens tripartita-Polygonum amphibium community',
    },
    {
      data_name: '20979',
      title: 'OV31 - Rorippa palustris-Filaginella uliginosa community',
    },
    {
      data_name: '20980',
      title: 'OV32 - Myosotis scorpioides-Ranunculus sceleratus community',
    },
    {
      data_name: '20981',
      title: 'OV33 - Polygonum lapathifolium-Poa annua community',
    },
    {
      data_name: '20982',
      title: 'OV34 - Allium schoenoprasum-Plantago maritima community',
    },
    {
      data_name: '20983',
      title: 'OV35 - Lythrum portula-Ranunculus flammula community',
    },
    {
      data_name: '20984',
      title: 'OV36 - Lythrum hyssopifolia-Juncus bufonius community',
    },
    {
      data_name: '20985',
      title: 'OV37 - Festuca ovina-Minuartia verna community',
    },
    {
      data_name: '20986',
      title: 'OV38 - Gymnocarpium robertianum-Arrhenatherum elatius community',
    },
    {
      data_name: '20987',
      title: 'OV39 - Asplenium trichomanes-Asplenium ruta-muraria community',
    },
    {
      data_name: '20977',
      title: 'OV3 - Papaver rhoeas-Viola arvensis community',
    },
    {
      data_name: '20989',
      title: 'OV40 - Asplenium viride-Cystopteris fragilis community',
    },
    { data_name: '20990', title: 'OV41 - Parietaria diffusa community' },
    { data_name: '20991', title: 'OV42 - Cymbalaria muralis community' },
    {
      data_name: '20988',
      title: 'OV4 - Chrysanthemum segetum-Spergula arvensis community',
    },
    {
      data_name: '20992',
      title: 'OV5 - Digitaria ischaemum-Erodium cicutarium community',
    },
    {
      data_name: '20993',
      title: 'OV6 - Cerastium glomeratum-Fumaria muralis ssp. boraei community',
    },
    {
      data_name: '20994',
      title: 'OV7 - Veronica persica-Veronica polita community',
    },
    {
      data_name: '20995',
      title: 'OV8 - Veronica persica-Alopecurus myosuroides community',
    },
    {
      data_name: '20996',
      title: 'OV9 - Matricaria perforata-Stellaria media community',
    },
    { data_name: '20998', title: 'S10 - Equisetum fluviatile swamp' },
    { data_name: '20999', title: 'S11 - Carex vesicaria swamp' },
    { data_name: '21000', title: 'S12 - Typha latifolia swamp' },
    { data_name: '21001', title: 'S13 - Typha angustifolia swamp' },
    { data_name: '21002', title: 'S14 - Sparganium erectum swamp' },
    { data_name: '21003', title: 'S15 - Acorus calamus swamp' },
    { data_name: '21004', title: 'S16 - Sagittaria sagittifolia swamp' },
    { data_name: '21005', title: 'S17 - Carex pseudocyperus swamp' },
    { data_name: '21006', title: 'S18 - Carex otrubae swamp' },
    { data_name: '21007', title: 'S19 - Eleocharis palustris swamp' },
    { data_name: '20997', title: 'S1 - Carex elata swamp' },
    {
      data_name: '21009',
      title: 'S20 - Scirpus lacustris ssp. tabernaemontani swamp',
    },
    { data_name: '21010', title: 'S21 - Scirpus maritimus swamp' },
    {
      data_name: '21011',
      title: 'S22 - Glyceria fluitans water-margin vegetation',
    },
    { data_name: '21012', title: 'S23 - Other water-margin vegetation' },
    {
      data_name: '21013',
      title: 'S24 - Phragmites australis-Peucedanum palustris tall-herb fen',
    },
    {
      data_name: '21014',
      title: 'S25 - Phragmites australis-Eupatorium cannabinum tall-herb fen',
    },
    {
      data_name: '21015',
      title: 'S26 - Phragmites australis-Urtica dioica tall-herb fen',
    },
    {
      data_name: '21016',
      title: 'S27 - Carex rostrata-Potentilla palustris tall-herb fen',
    },
    {
      data_name: '21017',
      title: 'S28 - Phalaris arundinacea tall-herb fen',
    },
    {
      data_name: '21008',
      title: 'S2 - Cladium mariscus swamp and sedge-beds',
    },
    { data_name: '21018', title: 'S3 - Carex paniculata swamp' },
    {
      data_name: '21019',
      title: 'S4 - Phragmites australis swamp and reed-beds',
    },
    { data_name: '21020', title: 'S5 - Glyceria maxima swamp' },
    { data_name: '21021', title: 'S6 - Carex riparia swamp' },
    { data_name: '21022', title: 'S7 - Carex acutiformis swamp' },
    {
      data_name: '21023',
      title: 'S8 - Scirpus lacustris ssp. lacustris swamp',
    },
    { data_name: '21024', title: 'S9 - Carex rostrata swamp' },
    {
      data_name: '21026',
      title: 'SD10 - Carex arenaria dune community',
    },
    {
      data_name: '21027',
      title: 'SD11 - Carex arenaria-Cornicularia aculeata dune community',
    },
    {
      data_name: '21028',
      title:
        'SD12 - Carex arenaria-Festuca ovina-Agrostis capillaris dune grassland',
    },
    {
      data_name: '21029',
      title: 'SD13 - Sagina nodosa-Bryum pseudotriquetrum dune-slack community',
    },
    {
      data_name: '21030',
      title: 'SD14 - Salix repens-Campylium stellatum dune-slack community',
    },
    {
      data_name: '21031',
      title: 'SD15 - Salix repens-Calliergon cuspidatum dune-slack community',
    },
    {
      data_name: '21032',
      title: 'SD16 - Salix repens-Holcus lanatus dune-slack community',
    },
    {
      data_name: '21033',
      title: 'SD17 - Potentilla anserina-Carex nigra dune-slack community',
    },
    {
      data_name: '21034',
      title: 'SD18 - Hippophae rhamnoides dune scrub',
    },
    {
      data_name: '21035',
      title:
        'SD19 - Phleum arenarium-Arenaria serpyllifolia dune annual community',
    },
    {
      data_name: '21025',
      title: 'SD1 - Rumex crispus-Glaucium flavum shingle community',
    },
    {
      data_name: '21036',
      title: 'SD2 - Honkenya peploides-Cakile maritima strandline community',
    },
    {
      data_name: '21037',
      title: 'SD3 - Matricaria maritima-Galium aparine strandline community',
    },
    {
      data_name: '21038',
      title: 'SD4 - Elymus farctus ssp. boreali-atlanticus foredune community',
    },
    {
      data_name: '21039',
      title: 'SD5 - Leymus arenarius mobile dune community',
    },
    {
      data_name: '21040',
      title: 'SD6 - Ammophila arenaria mobile dune community',
    },
    {
      data_name: '21041',
      title: 'SD7 - Ammophila arenaria-Festuca rubra semi-fixed dune community',
    },
    {
      data_name: '21042',
      title: 'SD8 - Festuca rubra-Galium verum fixed dune grassland',
    },
    {
      data_name: '21043',
      title: 'SD9 - Ammophila arenaria-Arrhenatherum elatius dune grassland',
    },
    {
      data_name: '21045',
      title:
        'SM10 - Transitional low-marsh vegetation with Puccinellia maritima -  annual Salicornia species and Suaeda maritima',
    },
    {
      data_name: '21046',
      title: 'SM11 - Aster tripolium var. discoideus salt-marsh community',
    },
    { data_name: '21047', title: 'SM12 - Rayed Aster tripolium stands' },
    {
      data_name: '21048',
      title: 'SM13 - Puccinellia maritima salt-marsh community',
    },
    {
      data_name: '21049',
      title: 'SM14 - Halimione portulacoides salt-marsh community',
    },
    {
      data_name: '21050',
      title: 'SM15 - Juncus maritimus-Triglochin maritima salt-marsh community',
    },
    {
      data_name: '21051',
      title: 'SM16 - Festuca rubra salt-marsh community',
    },
    {
      data_name: '21052',
      title: 'SM17 - Artemisia maritima salt-marsh community',
    },
    {
      data_name: '21053',
      title: 'SM18 - Juncus maritimus salt-marsh community',
    },
    {
      data_name: '21054',
      title: 'SM19 - Blysmus rufus salt-marsh community',
    },
    { data_name: '21044', title: 'SM1 - Zostera communities' },
    {
      data_name: '21056',
      title: 'SM20 - Eleocharis uniglumis salt-marsh community',
    },
    {
      data_name: '21057',
      title: 'SM21 - Suaeda vera-Limonium binervosum salt-marsh community',
    },
    {
      data_name: '21058',
      title:
        'SM22 - Halimione portulacoides-Frankenia laevis salt-marsh community',
    },
    {
      data_name: '21059',
      title:
        'SM23 - Spergularia marina-Puccinellia distans salt-marsh community',
    },
    {
      data_name: '21060',
      title: 'SM24 - Elymus pycnanthus salt-marsh community',
    },
    {
      data_name: '21061',
      title: 'SM25 - Suaeda vera drift-line community',
    },
    { data_name: '21062', title: 'SM26 - Inula crithmoides stands' },
    {
      data_name: '21063',
      title: 'SM28 - Elymus repens salt-marsh community',
    },
    {
      data_name: '21055',
      title: 'SM2 - Ruppia maritima salt-marsh community',
    },
    {
      data_name: '21064',
      title: 'SM3 - Eleocharis parvula salt-marsh community',
    },
    {
      data_name: '21065',
      title: 'SM4 - Spartina maritima salt-marsh community',
    },
    {
      data_name: '21066',
      title: 'SM5 - Spartina alterniflora salt-marsh community',
    },
    {
      data_name: '21067',
      title: 'SM6 - Spartina anglica salt-marsh community',
    },
    { data_name: '21068', title: 'SM7 - Arthrocnemum perenne stands' },
    {
      data_name: '21069',
      title: 'SM8 - Annual Salicornia salt-marsh community',
    },
    {
      data_name: '21070',
      title: 'SM9 - Suaeda maritima salt-marsh community',
    },
    {
      data_name: '21072',
      title: 'U10 - Carex bigelowii-Racomitrium lanuginosum moss-heath',
    },
    {
      data_name: '21073',
      title: 'U11 - Polytrichum sexangulare-Kiaeria starkei snow-bed',
    },
    {
      data_name: '21074',
      title: 'U12 - Salix herbacea-Racomitrium heterostichum snow-bed',
    },
    {
      data_name: '21075',
      title: 'U13 - Deschampsia cespitosa-Galium saxatile grassland',
    },
    {
      data_name: '21076',
      title:
        'U14 - Alchemilla alpina-Sibbaldia procumbens dwarf-herb community',
    },
    {
      data_name: '21077',
      title: 'U15 - Saxifraga aizoides-Alchemilla glabra banks',
    },
    {
      data_name: '21078',
      title: 'U16 - Luzula sylvatica-Vaccinium myrtillus tall-herb community',
    },
    {
      data_name: '21079',
      title: 'U17 - Luzula sylvatica-Geum rivale tall-herb community',
    },
    {
      data_name: '21080',
      title: 'U18 - Cryptogramma crispa-Athyrium distentifolium snow-bed',
    },
    {
      data_name: '21081',
      title: 'U19 - Thelypteris limbosperma-Blechnum spicant community',
    },
    {
      data_name: '21071',
      title:
        'U1 - Festuca ovina-Agrostis capillaris-Rumex acetosella grassland',
    },
    {
      data_name: '21083',
      title: 'U20 - Pteridium aquilinum-Galium saxatile community',
    },
    {
      data_name: '21084',
      title: 'U21 - Cryptogramma crispa-Deschampsia flexuosa community',
    },
    { data_name: '21082', title: 'U2 - Deschampsia flexuosa grassland' },
    { data_name: '21085', title: 'U3 - Agrostis curtisii grassland' },
    {
      data_name: '21086',
      title: 'U4 - Festuca ovina-Agrostis capillaris-Galium saxatile grassland',
    },
    {
      data_name: '21087',
      title: 'U5 - Nardus stricta-Galium saxatile grassland',
    },
    {
      data_name: '21088',
      title: 'U6 - Juncus squarrosus-Festuca ovina grassland',
    },
    {
      data_name: '21089',
      title: 'U7 - Nardus stricta-Carex bigelowii grass-heath',
    },
    {
      data_name: '21090',
      title: 'U8 - Carex bigelowii-Polytrichum alpinum sedge-heath',
    },
    {
      data_name: '21091',
      title: 'U9 - Juncus trifidus-Racomitrium lanuginosum rush-heath',
    },
    {
      data_name: '21093',
      title:
        'W10 - Quercus robur-Pteridium aquilinum-Rubus fruticosus woodland',
    },
    {
      data_name: '21094',
      title:
        'W11 - Quercus petraea-Betula pubescens-Oxalis acetosella woodland',
    },
    {
      data_name: '21095',
      title: 'W12 - Fagus sylvatica-Mercurialis perennis woodland',
    },
    { data_name: '21096', title: 'W13 - Taxus baccata woodland' },
    {
      data_name: '21097',
      title: 'W14 - Fagus sylvatica-Rubus fruticosus woodland',
    },
    {
      data_name: '21098',
      title: 'W15 - Fagus sylvatica-Deschampsia flexuosa woodland',
    },
    {
      data_name: '21099',
      title: 'W16 - Quercus spp.-Betula spp.-Deschampsia flexuosa woodland',
    },
    {
      data_name: '21100',
      title: 'W17 - Quercus petraea-Betula pubescens-Dicranum majus woodland',
    },
    {
      data_name: '21101',
      title: 'W18 - Pinus sylvestris-Hylocomium splendens woodland',
    },
    {
      data_name: '21102',
      title:
        'W19 - Juniperus communis ssp. communis-Oxalis acetosella woodland',
    },
    {
      data_name: '21092',
      title: 'W1 - Salix cinerea-Galium palustre woodland',
    },
    {
      data_name: '21104',
      title: 'W20 - Salix lapponum-Luzula sylvatica scrub',
    },
    {
      data_name: '21105',
      title: 'W21 - Crataegus monogyna-Hedera helix scrub',
    },
    {
      data_name: '21106',
      title: 'W22 - Prunus spinosa-Rubus fruticosus scrub',
    },
    {
      data_name: '21107',
      title: 'W23 - Ulex europaeus-Rubus fruticosus scrub',
    },
    {
      data_name: '21108',
      title: 'W24 - Rubus fruticosus-Holcus lanatus underscrub',
    },
    {
      data_name: '21109',
      title: 'W25 - Pteridium aquilinum-Rubus fruticosus underscrub',
    },
    {
      data_name: '21103',
      title:
        'W2 - Salix cinerea-Betula pubescens-Phragmites australis woodland',
    },
    {
      data_name: '21110',
      title: 'W3 - Salix pentandra-Carex rostrata woodland',
    },
    {
      data_name: '21111',
      title: 'W4 - Betula pubescens-Molinia caerulea woodland',
    },
    {
      data_name: '21112',
      title: 'W5 - Alnus glutinosa-Carex paniculata woodland',
    },
    {
      data_name: '21113',
      title: 'W6 - Alnus glutinosa-Urtica dioica woodland',
    },
    {
      data_name: '21114',
      title:
        'W7 - Alnus glutinosa-Fraxinus excelsior-Lysimachia nemorum woodland',
    },
    {
      data_name: '21115',
      title:
        'W8 - Fraxinus excelsior-Acer campestre-Mercurialis perennis woodland',
    },
    {
      data_name: '21116',
      title:
        'W9 - Fraxinus excelsior-Sorbus aucuparia-Mercurialis perennis woodland',
    },
  ],
} as const;

export const habitatDescriptionAttr = {
  id: 'smpAttr:1637',
  type: 'text_input',
  title: 'Habitat description',
  appearance: 'multiline',
} as const;

export const dominCoverAttr = {
  id: 'occAttr:214',
  type: 'choice_input',
  container: 'inline',
  choices: dominCoverValues,
} as const;

export const bbCoverAttr = {
  id: 'occAttr:890',
  type: 'choice_input',
  container: 'inline',
  choices: bbCoverValues,
} as const;

export const presenceCoverAttr = {
  id: 'occAttr:894',
  type: 'choice_input',
  container: 'inline',
  choices: presenceCoverValues,
} as const;

export const percentageCoverAttr = {
  id: 'occAttr:891',
  type: 'number_input',
  title: 'Percentage',
  appearance: 'counter',
  validations: { min: 0, max: 100 },
} as const;

export const frequencyCoverAttr = {
  id: 'occAttr:893',
  type: 'number_input',
  title: 'Cell frequency',
  appearance: 'counter',
  validations: { min: 0, max: 1 },
} as const;

export const countCoverAttr = {
  id: 'occAttr:892',
  type: 'number_input',
  title: 'Count',
  appearance: 'counter',
  validations: { min: 0, max: 1000 },
} as const;

export const getCover = (model: Occurrence) => {
  const findLabel = (choices: Choice[], val: any) => {
    const byValue = (choice: Choice) => choice.data_name === val;
    return choices.find(byValue)?.title;
  };

  switch (model.parent?.attrs[abundanceAttr.id]) {
    case '18881':
      return findLabel(dominCoverAttr.choices, model.attrs[dominCoverAttr.id]);
    case '18882':
      return findLabel(bbCoverAttr.choices, model.attrs[bbCoverAttr.id]);
    case '18883':
      return model.attrs[percentageCoverAttr.id];
    case '18884':
      return model.attrs[countCoverAttr.id];
    case '18885':
      return model.attrs[frequencyCoverAttr.id];
    case '18892':
      return findLabel(
        presenceCoverAttr.choices,
        model.attrs[presenceCoverAttr.id]
      );
    default:
      return null;
  }
};

export const plotGroupAttr = (attrs?: Attrs) => {
  const plotGroups: any = {};
  locations
    .filter(bySurvey('standard'))
    .filter(byGroup(attrs?.[groupAttr().id]))
    .forEach((location: Location) => {
      if (!location.attrs.plotGroupIdsAndNamesForPlot) return;
      Object.assign(plotGroups, location.attrs.plotGroupIdsAndNamesForPlot);
    });

  const getOption = ([value, title]: any) => ({ data_name: value, title });
  const choices = Object.entries(plotGroups).map(getOption);

  return {
    id: 'plotGroupId',
    type: 'choice_input',
    title: 'Plot group',
    prefix: locationOutlineIcon,
    container: 'page',
    choices,
    //       set(id: any, sample: SampleModel) {
    //         const plotGroups: any = getPlotGroups(
    //           sample.getSurvey().name,
    //           sample.attrs.group?.id
    //         );
    //         const name = plotGroups[id];
    //         if (!name) {
    //           console.warn(`Plot Group with ID ${id} was not found`);
    //           return;
    //         }
    //         sample.attrs.location = undefined; // unset
    //         sample.attrs.plotGroup = { id, name };
    //       },
  } as const;
};

const canopyAttr = {
  id: 'smpAttr:1624',
};

const survey: Survey = {
  id: 599,
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
      new AppOccurrence({ attrs: { ...taxon, [gridAttr.id]: grid } }),

    verify: (_, model) =>
      object({
        cover: z.union([z.string(), z.number()], {
          required_error: 'Cover is missing',
        }),
      }).safeParse({ cover: getCover(model) }).error,
  },

  create({ Sample }) {
    const sample = new Sample({
      metadata: {
        survey: survey.name,
      },
      attrs: {
        surveyId: survey.id,
        date: new Date().toISOString().split('T')[0],
        recorderNames: userModel.getPrettyName(),
        [canopyAttr.id]: true,
        training: appModel.attrs.useTraining,
      },
    });

    return sample;
  },

  verify: attrs =>
    object({
      date: z.string(),
      locationId: z.string({ required_error: 'Location is missing' }),
    }).safeParse(attrs).error,
};

export default survey;
