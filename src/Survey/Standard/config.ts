/* eslint-disable no-param-reassign */
import { listOutline, locationOutline, peopleOutline } from 'ionicons/icons';
import { z, object } from 'zod';
import locations, { bySurvey } from 'common/models/collections/locations';
import Location from 'common/models/location';
import SampleModel from 'common/models/sample';
import appModel from 'models/app';
import {
  byGroup,
  dominCoverValues,
  grazingAnimalsAttr,
  grazingAttr,
  groupAttr,
  lichensAttr,
  litterAttr,
  managementAttr,
  managementOtherAttr,
  recorderAttr,
  rockAttr,
  soilAttr,
  Survey,
  woodCoverAttr,
} from 'Survey/common/config';

export const getPlotGroups = (survey: Survey['name'], groupId?: string) => {
  const plotGroups: any = {};
  locations
    .filter(bySurvey(survey))
    .filter(byGroup(groupId))
    .forEach((location: Location) => {
      if (!location.attrs.plotGroupIdsAndNamesForPlot) return;
      Object.assign(plotGroups, location.attrs.plotGroupIdsAndNamesForPlot);
    });
  return plotGroups;
};

const plotGroupAttr = {
  menuProps: { label: 'Plot group', icon: locationOutline },
  pageProps: {
    headerProps: { title: 'Plot group' },
    attrProps: {
      input: 'radio',
      inputProps: (sample: SampleModel) => {
        const plotGroups: any = getPlotGroups(
          sample.getSurvey().name,
          sample.attrs.group?.id
        );

        const getOption = ([value, label]: any) => ({ value, label });
        return { options: Object.entries(plotGroups).map(getOption) };
      },
      set(id: any, sample: SampleModel) {
        const plotGroups: any = getPlotGroups(
          sample.getSurvey().name,
          sample.attrs.group?.id
        );
        const name = plotGroups[id];
        if (!name) {
          console.warn(`Plot Group with ID ${id} was not found`);
          return;
        }
        sample.attrs.location = undefined; // unset
        sample.attrs.plotGroup = { id, name };
      },
      get(sample: SampleModel) {
        return sample.attrs.plotGroup?.id;
      },
    },
  },
  remote: { id: 'group_id', values: (val: any) => val.id },
};

const abundanceOptions = [
  { value: 'Domin', id: 18881 },
  { value: 'Braun-Blanquet', id: 18882 },
  { value: 'Percentage', id: 18883 },
  { value: 'Individual plant count', id: 18884 },
  { value: 'Cell frequency', id: 18885 },
  { value: 'Present/Absent', id: 18892 },
];

const communityOptions = [
  { id: 20836, value: 'A10 - Polygonum amphibium community' },
  {
    id: 20837,
    value: 'A11 - Potamogeton pectinatus-Myriophyllum spicatum community',
  },
  { id: 20838, value: 'A12 - Potamogeton pectinatus community' },
  {
    id: 20839,
    value: 'A13 - Potamogeton perfoliatus-Myriophyllum alterniflorum community',
  },
  { id: 20840, value: 'A14 - Myriophyllum alterniflorum community' },
  { id: 20841, value: 'A15 - Elodea canadensis community' },
  { id: 20842, value: 'A16 - Callitriche stagnalis community' },
  {
    id: 20843,
    value: 'A17 - Ranunculus penicillatus ssp. pseudofluitans community',
  },
  { id: 20844, value: 'A18 - Ranunculus fluitans community' },
  { id: 20845, value: 'A19 - Ranunculus aquatilis community' },
  { id: 20835, value: 'A1 - Lemna gibba community' },
  { id: 20847, value: 'A20 - Ranunculus peltatus community' },
  { id: 20848, value: 'A21 - Ranunculus baudotii community' },
  {
    id: 20849,
    value: 'A22 - Littorella uniflora-Lobelia dortmanna community',
  },
  { id: 20850, value: 'A23 - Isoetes lacustris/setacea community' },
  { id: 20851, value: 'A24 - Juncus bulbosus community' },
  { id: 20846, value: 'A2 - Lemna minor community' },
  {
    id: 20852,
    value: 'A3 - Spirodela polyrhiza-Hydrocharis morsus-ranae community',
  },
  {
    id: 20853,
    value: 'A4 - Hydrocharis morsus-ranae-Stratiotes aloides community',
  },
  { id: 20854, value: 'A5 - Ceratophyllum demersum community' },
  { id: 20855, value: 'A7 - Nymphaea alba community' },
  { id: 20856, value: 'A8 - Nuphar lutea community' },
  { id: 20857, value: 'A9 - Potamogeton natans community' },
  {
    id: 20859,
    value: 'CG10 - Festuca ovina-Agrostis capillaris-Thymus praecox grassland',
  },
  {
    id: 20860,
    value:
      'CG11 - Festuca ovina-Agrostis capillaris-Alchemilla alpina grass-heath',
  },
  {
    id: 20861,
    value:
      'CG12 - Festuca ovina-Alchemilla alpina-Silene acaulis dwarf-herb community',
  },
  { id: 20862, value: 'CG13 - Dryas octopetala-Carex flacca heath' },
  {
    id: 20863,
    value: 'CG14 - Dryas octopetala-Silene acaulis ledge community',
  },
  { id: 20858, value: 'CG1 - Festuca ovina-Carlina vulgaris grassland' },
  { id: 20864, value: 'CG2 - Festuca ovina-Avenula pratensis grassland' },
  { id: 20865, value: 'CG3 - Bromus erectus grassland' },
  { id: 20866, value: 'CG4 - Brachypodium pinnatum grassland' },
  {
    id: 20867,
    value: 'CG5 - Bromus erectus-Brachypodium pinnatum grassland',
  },
  { id: 20868, value: 'CG6 - Avenula pubescens grassland' },
  {
    id: 20869,
    value:
      'CG7 - Festuca ovina-Hieracium pilosella-Thymus praecox/pulegioides grassland',
  },
  {
    id: 20870,
    value: 'CG8 - Sesleria albicans-Scabiosa columbaria grassland',
  },
  { id: 20871, value: 'CG9 - Sesleria albicans-Galium sterneri grassland' },
  { id: 20873, value: 'H10 - Calluna vulgaris-Erica cinerea heath' },
  { id: 20874, value: 'H11 - Calluna vulgaris-Carex arenaria heath' },
  { id: 20875, value: 'H12 - Calluna vulgaris-Vaccinium myrtillus heath' },
  { id: 20876, value: 'H13 - Calluna vulgaris-Cladonia arbuscula heath' },
  {
    id: 20877,
    value: 'H14 - Calluna vulgaris-Racomitrium lanuginosum heath',
  },
  {
    id: 20878,
    value: 'H15 - Calluna vulgaris-Juniperus communis ssp. nana heath',
  },
  {
    id: 20879,
    value: 'H16 - Calluna vulgaris-Arctostaphylos uva-ursi heath',
  },
  { id: 20880, value: 'H17 - Calluna vulgaris-Arctostaphylos alpinus heath' },
  {
    id: 20881,
    value: 'H18 - Vaccinium myrtillus-Deschampsia flexuosa heath',
  },
  { id: 20882, value: 'H19 - Vaccinium myrtillus-Cladonia arbuscula heath' },
  { id: 20872, value: 'H1 - Calluna vulgaris-Festuca ovina heath' },
  {
    id: 20884,
    value: 'H20 - Vaccinium myrtillus-Racomitrium lanuginosum heath',
  },
  {
    id: 20885,
    value:
      'H21 - Calluna vulgaris-Vaccinium myrtillus-Sphagnum capillifolium heath',
  },
  { id: 20886, value: 'H22 - Vaccinium myrtillus-Rubus chamaemorus heath' },
  { id: 20883, value: 'H2 - Calluna vulgaris-Ulex minor heath' },
  { id: 20887, value: 'H3 - Ulex minor-Agrostis curtisii heath' },
  { id: 20888, value: 'H4 - Ulex gallii-Agrostis curtisii heath' },
  { id: 20889, value: 'H5 - Erica vagans-Schoenus nigricans heath' },
  { id: 20890, value: 'H6 - Erica vagans-Ulex europaeus heath' },
  { id: 20891, value: 'H7 - Calluna vulgaris-Scilla verna heath' },
  { id: 20892, value: 'H8 - Calluna vulgaris-Ulex gallii heath' },
  { id: 20893, value: 'H9 - Calluna vulgaris-Deschampsia flexuosa heath' },
  { id: 20895, value: 'M10 - Carex dioica-Pinguicula vulgaris mire' },
  { id: 20896, value: 'M11 - Carex demissa-Saxifraga aizoides mire' },
  { id: 20897, value: 'M12 - Carex saxatilis mire' },
  { id: 20898, value: 'M13 - Schoenus nigricans-Juncus subnodulosus mire' },
  { id: 20899, value: 'M14 - Schoenus nigricans-Narthecium ossifragum mire' },
  { id: 20900, value: 'M15 - Scirpus cespitosus-Erica tetralix wet heath' },
  { id: 20901, value: 'M16 - Erica tetralix-Sphagnum compactum wet heath' },
  {
    id: 20902,
    value: 'M17 - Scirpus cespitosus-Eriophorum vaginatum blanket mire',
  },
  {
    id: 20903,
    value: 'M18 - Erica tetralix-Sphagnum papillosum raised and blanket mire',
  },
  {
    id: 20904,
    value: 'M19 - Calluna vulgaris-Eriophorum vaginatum blanket mire',
  },
  { id: 20894, value: 'M1 - Sphagnum auriculatum bog pool community' },
  { id: 20906, value: 'M20 - Eriophorum vaginatum blanket and raised mire' },
  {
    id: 20907,
    value: 'M21 - Narthecium ossifragum-Sphagnum papillosum valley mire',
  },
  {
    id: 20908,
    value: 'M22 - Juncus subnodulosus-Cirsium palustre fen-meadow',
  },
  {
    id: 20909,
    value: 'M23 - Juncus effusus/acutiflorus-Galium palustre rush-pasture',
  },
  { id: 20910, value: 'M24 - Molinia caerulea-Cirsium dissectum fen-meadow' },
  { id: 20911, value: 'M25 - Molinia caerulea-Potentilla erecta mire' },
  { id: 20912, value: 'M26 - Molinia caerulea-Crepis paludosa mire' },
  { id: 20913, value: 'M27 - Filipendula ulmaria-Angelica sylvestris mire' },
  { id: 20914, value: 'M28 - Iris pseudacorus-Filipendula ulmaria mire' },
  {
    id: 20915,
    value: 'M29 - Hypericum elodes-Potamogeton polygonifolius soakway',
  },
  {
    id: 20905,
    value: 'M2 - Sphagnum cuspidatum/recurvum bog pool community',
  },
  { id: 20917, value: 'M31 - Anthelia julacea-Sphagnum auriculatum spring' },
  { id: 20918, value: 'M32 - Philonotis fontana-Saxifraga stellaris spring' },
  { id: 20919, value: 'M33 - Pohlia wahlenbergii var. glacialis spring' },
  { id: 20920, value: 'M34 - Carex demissa-Koenigia islandica flush' },
  { id: 20921, value: 'M35 - Ranunculus omiophyllus-Montia fontana rill' },
  { id: 20922, value: 'M37 - Cratoneuron commutatum-Festuca rubra spring' },
  { id: 20923, value: 'M38 - Cratoneuron commutatum-Carex nigra spring' },
  { id: 20916, value: 'M3 - Eriophorum angustifolium bog pool community' },
  { id: 20924, value: 'M4 - Carex rostrata-Sphagnum recurvum mire' },
  { id: 20925, value: 'M5 - Carex rostrata-Sphagnum squarrosum mire' },
  {
    id: 20926,
    value: 'M6 - Carex echinata-Sphagnum recurvum/auriculatum mire',
  },
  { id: 20927, value: 'M7 - Carex curta-Sphagnum russowii mire' },
  { id: 20928, value: 'M8 - Carex rostrata-Sphagnum warnstorfii mire' },
  {
    id: 20929,
    value: 'M9 - Carex rostrata-Calliergon cuspidatum/giganteum mire',
  },
  {
    id: 20931,
    value: 'MC10 - Festuca rubra-Plantago spp. maritime grassland',
  },
  {
    id: 20932,
    value:
      'MC11 - Festuca rubra-Daucus carota ssp. gummifer maritime grassland',
  },
  {
    id: 20933,
    value:
      'MC12 - Festuca rubra-Hyacinthoides non-scripta maritime bluebell community',
  },
  {
    id: 20930,
    value:
      'MC1 - Crithmum maritimum-Spergularia rupicola maritime rock-crevice community',
  },
  {
    id: 20934,
    value:
      'MC2 - Armeria maritima-Ligusticum scoticum maritime rock-crevice community',
  },
  {
    id: 20935,
    value:
      'MC3 - Rhodiola rosea-Armeria maritima maritime cliff-ledge community',
  },
  {
    id: 20936,
    value: 'MC4 - Brassica oleracea maritime cliff-ledge community',
  },
  {
    id: 20937,
    value:
      'MC5 - Armeria maritima-Cerastium diffusum ssp. diffusum maritime therophyte community',
  },
  {
    id: 20938,
    value:
      'MC6 - Atriplex prostrata-Beta vulgaris ssp. maritima sea-bird cliff community',
  },
  {
    id: 20939,
    value: 'MC7 - Stellaria media-Rumex acetosa sea-bird cliff community',
  },
  {
    id: 20940,
    value: 'MC8 - Festuca rubra-Armeria maritima maritime grassland',
  },
  {
    id: 20941,
    value: 'MC9 - Festuca rubra-Holcus lanatus maritime grassland',
  },
  { id: 20943, value: 'MG10 - Holcus lanatus-Juncus effusus rush-pasture' },
  {
    id: 20944,
    value:
      'MG11 - Festuca rubra-Agrostis stolonifera-Potentilla anserina grassland',
  },
  { id: 20945, value: 'MG12 - Festuca arundinacea grassland' },
  {
    id: 20946,
    value: 'MG13 - Agrostis stolonifera-Alopecurus geniculatus grassland',
  },
  { id: 20942, value: 'MG1 - Arrhenatherum elatius grassland' },
  {
    id: 20947,
    value:
      'MG2 - Arrhenatherum elatius-Filipendula ulmaria tall-herb grassland',
  },
  {
    id: 20948,
    value: 'MG3 - Anthoxanthum odoratum-Geranium sylvaticum grassland',
  },
  {
    id: 20949,
    value: 'MG4 - Alopecurus pratensis-Sanguisorba officinalis grassland',
  },
  { id: 20950, value: 'MG5 - Cynosurus cristatus-Centaurea nigra grassland' },
  { id: 20951, value: 'MG6 - Lolium perenne-Cynosurus cristatus grassland' },
  { id: 20952, value: 'MG7 - Lolium perenne leys and related grasslands' },
  {
    id: 20953,
    value: 'MG8 - Cynosurus cristatus-Caltha palustris grassland',
  },
  {
    id: 20954,
    value: 'MG9 - Holcus lanatus-Deschampsia cespitosa grassland',
  },
  { id: 20956, value: 'OV10 - Poa annua-Senecio vulgaris community' },
  { id: 20957, value: 'OV11 - Poa annua-Stachys arvensis community' },
  { id: 20958, value: 'OV12 - Poa annua-Myosotis arvensis community' },
  {
    id: 20959,
    value: 'OV13 - Stellaria media-Capsella bursa-pastoris community',
  },
  { id: 20960, value: 'OV14 - Urtica urens-Lamium amplexicaule community' },
  {
    id: 20961,
    value: 'OV15 - Anagallis arvensis-Veronica persica community',
  },
  { id: 20962, value: 'OV16 - Papaver rhoeas-Silene noctiflora community' },
  { id: 20963, value: 'OV17 - Reseda lutea-Polygonum aviculare community' },
  {
    id: 20964,
    value: 'OV18 - Polygonum aviculare-Chamomilla suaveolens community',
  },
  { id: 20965, value: 'OV19 - Poa annua-Matricaria perforata community' },
  { id: 20955, value: 'OV1 - Viola arvensis-Aphanes microcarpa community' },
  { id: 20967, value: 'OV20 - Poa annua-Sagina procumbens community' },
  { id: 20968, value: 'OV21 - Poa annua-Plantago major community' },
  { id: 20969, value: 'OV22 - Poa annua-Taraxacum officinale community' },
  { id: 20970, value: 'OV23 - Lolium perenne-Dactylis glomerata community' },
  { id: 20971, value: 'OV24 - Urtica dioica-Galium aparine community' },
  { id: 20972, value: 'OV25 - Urtica dioica-Cirsium arvense community' },
  { id: 20973, value: 'OV26 - Epilobium hirsutum community' },
  { id: 20974, value: 'OV27 - Epilobium angustifolium community' },
  {
    id: 20975,
    value: 'OV28 - Agrostis stolonifera-Ranunculus repens community',
  },
  {
    id: 20976,
    value: 'OV29 - Alopecurus geniculatus-Rorippa palustris community',
  },
  { id: 20966, value: 'OV2 - Briza minor-Silene gallica community' },
  {
    id: 20978,
    value: 'OV30 - Bidens tripartita-Polygonum amphibium community',
  },
  {
    id: 20979,
    value: 'OV31 - Rorippa palustris-Filaginella uliginosa community',
  },
  {
    id: 20980,
    value: 'OV32 - Myosotis scorpioides-Ranunculus sceleratus community',
  },
  { id: 20981, value: 'OV33 - Polygonum lapathifolium-Poa annua community' },
  {
    id: 20982,
    value: 'OV34 - Allium schoenoprasum-Plantago maritima community',
  },
  {
    id: 20983,
    value: 'OV35 - Lythrum portula-Ranunculus flammula community',
  },
  {
    id: 20984,
    value: 'OV36 - Lythrum hyssopifolia-Juncus bufonius community',
  },
  { id: 20985, value: 'OV37 - Festuca ovina-Minuartia verna community' },
  {
    id: 20986,
    value: 'OV38 - Gymnocarpium robertianum-Arrhenatherum elatius community',
  },
  {
    id: 20987,
    value: 'OV39 - Asplenium trichomanes-Asplenium ruta-muraria community',
  },
  { id: 20977, value: 'OV3 - Papaver rhoeas-Viola arvensis community' },
  {
    id: 20989,
    value: 'OV40 - Asplenium viride-Cystopteris fragilis community',
  },
  { id: 20990, value: 'OV41 - Parietaria diffusa community' },
  { id: 20991, value: 'OV42 - Cymbalaria muralis community' },
  {
    id: 20988,
    value: 'OV4 - Chrysanthemum segetum-Spergula arvensis community',
  },
  {
    id: 20992,
    value: 'OV5 - Digitaria ischaemum-Erodium cicutarium community',
  },
  {
    id: 20993,
    value: 'OV6 - Cerastium glomeratum-Fumaria muralis ssp. boraei community',
  },
  { id: 20994, value: 'OV7 - Veronica persica-Veronica polita community' },
  {
    id: 20995,
    value: 'OV8 - Veronica persica-Alopecurus myosuroides community',
  },
  {
    id: 20996,
    value: 'OV9 - Matricaria perforata-Stellaria media community',
  },
  { id: 20998, value: 'S10 - Equisetum fluviatile swamp' },
  { id: 20999, value: 'S11 - Carex vesicaria swamp' },
  { id: 21000, value: 'S12 - Typha latifolia swamp' },
  { id: 21001, value: 'S13 - Typha angustifolia swamp' },
  { id: 21002, value: 'S14 - Sparganium erectum swamp' },
  { id: 21003, value: 'S15 - Acorus calamus swamp' },
  { id: 21004, value: 'S16 - Sagittaria sagittifolia swamp' },
  { id: 21005, value: 'S17 - Carex pseudocyperus swamp' },
  { id: 21006, value: 'S18 - Carex otrubae swamp' },
  { id: 21007, value: 'S19 - Eleocharis palustris swamp' },
  { id: 20997, value: 'S1 - Carex elata swamp' },
  { id: 21009, value: 'S20 - Scirpus lacustris ssp. tabernaemontani swamp' },
  { id: 21010, value: 'S21 - Scirpus maritimus swamp' },
  { id: 21011, value: 'S22 - Glyceria fluitans water-margin vegetation' },
  { id: 21012, value: 'S23 - Other water-margin vegetation' },
  {
    id: 21013,
    value: 'S24 - Phragmites australis-Peucedanum palustris tall-herb fen',
  },
  {
    id: 21014,
    value: 'S25 - Phragmites australis-Eupatorium cannabinum tall-herb fen',
  },
  {
    id: 21015,
    value: 'S26 - Phragmites australis-Urtica dioica tall-herb fen',
  },
  {
    id: 21016,
    value: 'S27 - Carex rostrata-Potentilla palustris tall-herb fen',
  },
  { id: 21017, value: 'S28 - Phalaris arundinacea tall-herb fen' },
  { id: 21008, value: 'S2 - Cladium mariscus swamp and sedge-beds' },
  { id: 21018, value: 'S3 - Carex paniculata swamp' },
  { id: 21019, value: 'S4 - Phragmites australis swamp and reed-beds' },
  { id: 21020, value: 'S5 - Glyceria maxima swamp' },
  { id: 21021, value: 'S6 - Carex riparia swamp' },
  { id: 21022, value: 'S7 - Carex acutiformis swamp' },
  { id: 21023, value: 'S8 - Scirpus lacustris ssp. lacustris swamp' },
  { id: 21024, value: 'S9 - Carex rostrata swamp' },
  { id: 21026, value: 'SD10 - Carex arenaria dune community' },
  {
    id: 21027,
    value: 'SD11 - Carex arenaria-Cornicularia aculeata dune community',
  },
  {
    id: 21028,
    value:
      'SD12 - Carex arenaria-Festuca ovina-Agrostis capillaris dune grassland',
  },
  {
    id: 21029,
    value: 'SD13 - Sagina nodosa-Bryum pseudotriquetrum dune-slack community',
  },
  {
    id: 21030,
    value: 'SD14 - Salix repens-Campylium stellatum dune-slack community',
  },
  {
    id: 21031,
    value: 'SD15 - Salix repens-Calliergon cuspidatum dune-slack community',
  },
  {
    id: 21032,
    value: 'SD16 - Salix repens-Holcus lanatus dune-slack community',
  },
  {
    id: 21033,
    value: 'SD17 - Potentilla anserina-Carex nigra dune-slack community',
  },
  { id: 21034, value: 'SD18 - Hippophae rhamnoides dune scrub' },
  {
    id: 21035,
    value:
      'SD19 - Phleum arenarium-Arenaria serpyllifolia dune annual community',
  },
  {
    id: 21025,
    value: 'SD1 - Rumex crispus-Glaucium flavum shingle community',
  },
  {
    id: 21036,
    value: 'SD2 - Honkenya peploides-Cakile maritima strandline community',
  },
  {
    id: 21037,
    value: 'SD3 - Matricaria maritima-Galium aparine strandline community',
  },
  {
    id: 21038,
    value: 'SD4 - Elymus farctus ssp. boreali-atlanticus foredune community',
  },
  { id: 21039, value: 'SD5 - Leymus arenarius mobile dune community' },
  { id: 21040, value: 'SD6 - Ammophila arenaria mobile dune community' },
  {
    id: 21041,
    value: 'SD7 - Ammophila arenaria-Festuca rubra semi-fixed dune community',
  },
  {
    id: 21042,
    value: 'SD8 - Festuca rubra-Galium verum fixed dune grassland',
  },
  {
    id: 21043,
    value: 'SD9 - Ammophila arenaria-Arrhenatherum elatius dune grassland',
  },
  {
    id: 21045,
    value:
      'SM10 - Transitional low-marsh vegetation with Puccinellia maritima -  annual Salicornia species and Suaeda maritima',
  },
  {
    id: 21046,
    value: 'SM11 - Aster tripolium var. discoideus salt-marsh community',
  },
  { id: 21047, value: 'SM12 - Rayed Aster tripolium stands' },
  { id: 21048, value: 'SM13 - Puccinellia maritima salt-marsh community' },
  { id: 21049, value: 'SM14 - Halimione portulacoides salt-marsh community' },
  {
    id: 21050,
    value: 'SM15 - Juncus maritimus-Triglochin maritima salt-marsh community',
  },
  { id: 21051, value: 'SM16 - Festuca rubra salt-marsh community' },
  { id: 21052, value: 'SM17 - Artemisia maritima salt-marsh community' },
  { id: 21053, value: 'SM18 - Juncus maritimus salt-marsh community' },
  { id: 21054, value: 'SM19 - Blysmus rufus salt-marsh community' },
  { id: 21044, value: 'SM1 - Zostera communities' },
  { id: 21056, value: 'SM20 - Eleocharis uniglumis salt-marsh community' },
  {
    id: 21057,
    value: 'SM21 - Suaeda vera-Limonium binervosum salt-marsh community',
  },
  {
    id: 21058,
    value:
      'SM22 - Halimione portulacoides-Frankenia laevis salt-marsh community',
  },
  {
    id: 21059,
    value: 'SM23 - Spergularia marina-Puccinellia distans salt-marsh community',
  },
  { id: 21060, value: 'SM24 - Elymus pycnanthus salt-marsh community' },
  { id: 21061, value: 'SM25 - Suaeda vera drift-line community' },
  { id: 21062, value: 'SM26 - Inula crithmoides stands' },
  { id: 21063, value: 'SM28 - Elymus repens salt-marsh community' },
  { id: 21055, value: 'SM2 - Ruppia maritima salt-marsh community' },
  { id: 21064, value: 'SM3 - Eleocharis parvula salt-marsh community' },
  { id: 21065, value: 'SM4 - Spartina maritima salt-marsh community' },
  { id: 21066, value: 'SM5 - Spartina alterniflora salt-marsh community' },
  { id: 21067, value: 'SM6 - Spartina anglica salt-marsh community' },
  { id: 21068, value: 'SM7 - Arthrocnemum perenne stands' },
  { id: 21069, value: 'SM8 - Annual Salicornia salt-marsh community' },
  { id: 21070, value: 'SM9 - Suaeda maritima salt-marsh community' },
  {
    id: 21072,
    value: 'U10 - Carex bigelowii-Racomitrium lanuginosum moss-heath',
  },
  {
    id: 21073,
    value: 'U11 - Polytrichum sexangulare-Kiaeria starkei snow-bed',
  },
  {
    id: 21074,
    value: 'U12 - Salix herbacea-Racomitrium heterostichum snow-bed',
  },
  {
    id: 21075,
    value: 'U13 - Deschampsia cespitosa-Galium saxatile grassland',
  },
  {
    id: 21076,
    value: 'U14 - Alchemilla alpina-Sibbaldia procumbens dwarf-herb community',
  },
  { id: 21077, value: 'U15 - Saxifraga aizoides-Alchemilla glabra banks' },
  {
    id: 21078,
    value: 'U16 - Luzula sylvatica-Vaccinium myrtillus tall-herb community',
  },
  {
    id: 21079,
    value: 'U17 - Luzula sylvatica-Geum rivale tall-herb community',
  },
  {
    id: 21080,
    value: 'U18 - Cryptogramma crispa-Athyrium distentifolium snow-bed',
  },
  {
    id: 21081,
    value: 'U19 - Thelypteris limbosperma-Blechnum spicant community',
  },
  {
    id: 21071,
    value: 'U1 - Festuca ovina-Agrostis capillaris-Rumex acetosella grassland',
  },
  { id: 21083, value: 'U20 - Pteridium aquilinum-Galium saxatile community' },
  {
    id: 21084,
    value: 'U21 - Cryptogramma crispa-Deschampsia flexuosa community',
  },
  { id: 21082, value: 'U2 - Deschampsia flexuosa grassland' },
  { id: 21085, value: 'U3 - Agrostis curtisii grassland' },
  {
    id: 21086,
    value: 'U4 - Festuca ovina-Agrostis capillaris-Galium saxatile grassland',
  },
  { id: 21087, value: 'U5 - Nardus stricta-Galium saxatile grassland' },
  { id: 21088, value: 'U6 - Juncus squarrosus-Festuca ovina grassland' },
  { id: 21089, value: 'U7 - Nardus stricta-Carex bigelowii grass-heath' },
  {
    id: 21090,
    value: 'U8 - Carex bigelowii-Polytrichum alpinum sedge-heath',
  },
  {
    id: 21091,
    value: 'U9 - Juncus trifidus-Racomitrium lanuginosum rush-heath',
  },
  {
    id: 21093,
    value: 'W10 - Quercus robur-Pteridium aquilinum-Rubus fruticosus woodland',
  },
  {
    id: 21094,
    value: 'W11 - Quercus petraea-Betula pubescens-Oxalis acetosella woodland',
  },
  { id: 21095, value: 'W12 - Fagus sylvatica-Mercurialis perennis woodland' },
  { id: 21096, value: 'W13 - Taxus baccata woodland' },
  { id: 21097, value: 'W14 - Fagus sylvatica-Rubus fruticosus woodland' },
  { id: 21098, value: 'W15 - Fagus sylvatica-Deschampsia flexuosa woodland' },
  {
    id: 21099,
    value: 'W16 - Quercus spp.-Betula spp.-Deschampsia flexuosa woodland',
  },
  {
    id: 21100,
    value: 'W17 - Quercus petraea-Betula pubescens-Dicranum majus woodland',
  },
  {
    id: 21101,
    value: 'W18 - Pinus sylvestris-Hylocomium splendens woodland',
  },
  {
    id: 21102,
    value: 'W19 - Juniperus communis ssp. communis-Oxalis acetosella woodland',
  },
  { id: 21092, value: 'W1 - Salix cinerea-Galium palustre woodland' },
  { id: 21104, value: 'W20 - Salix lapponum-Luzula sylvatica scrub' },
  { id: 21105, value: 'W21 - Crataegus monogyna-Hedera helix scrub' },
  { id: 21106, value: 'W22 - Prunus spinosa-Rubus fruticosus scrub' },
  { id: 21107, value: 'W23 - Ulex europaeus-Rubus fruticosus scrub' },
  { id: 21108, value: 'W24 - Rubus fruticosus-Holcus lanatus underscrub' },
  {
    id: 21109,
    value: 'W25 - Pteridium aquilinum-Rubus fruticosus underscrub',
  },
  {
    id: 21103,
    value: 'W2 - Salix cinerea-Betula pubescens-Phragmites australis woodland',
  },
  { id: 21110, value: 'W3 - Salix pentandra-Carex rostrata woodland' },
  { id: 21111, value: 'W4 - Betula pubescens-Molinia caerulea woodland' },
  { id: 21112, value: 'W5 - Alnus glutinosa-Carex paniculata woodland' },
  { id: 21113, value: 'W6 - Alnus glutinosa-Urtica dioica woodland' },
  {
    id: 21114,
    value:
      'W7 - Alnus glutinosa-Fraxinus excelsior-Lysimachia nemorum woodland',
  },
  {
    id: 21115,
    value:
      'W8 - Fraxinus excelsior-Acer campestre-Mercurialis perennis woodland',
  },
  {
    id: 21116,
    value:
      'W9 - Fraxinus excelsior-Sorbus aucuparia-Mercurialis perennis woodland',
  },
];

export type AbundanceType =
  | 'Domin'
  | 'Braun-Blanquet'
  | 'Percentage'
  | 'Individual plant count'
  | 'Cell frequency'
  | 'Present/Absent';

export const bbCoverValues = [
  { value: '+,<1%', id: 18886 },
  { value: '1,1-5%', id: 18887 },
  { value: '2,6-25%', id: 18888 },
  { value: '3,26-50%', id: 18889 },
  { value: '4,51-75%', id: 18890 },
  { value: '5,76-100%', id: 18891 },
];

export const presenceCoverValues = [
  { value: 'Present', id: 18893 },
  { value: 'Absent', id: 18894 },
];

const survey: Survey = {
  id: 599,
  name: 'standard',
  label: 'Standard',

  attrs: {
    group: groupAttr,
    plotGroup: plotGroupAttr,
    abundanceType: {
      menuProps: { label: 'Abundance type', icon: peopleOutline },
      pageProps: {
        headerProps: { title: 'Abundance type' },
        attrProps: {
          input: 'radio',
          inputProps: { options: abundanceOptions },
        },
      },
      remote: { id: 1625, values: abundanceOptions },
    },

    speciesComments: {
      menuProps: { label: 'Species comments', icon: peopleOutline },
      pageProps: {
        headerProps: { title: 'Species comments' },
        attrProps: {
          input: 'textarea',
          inputProps: { placeholder: 'Comments...' },
        },
      },
      remote: { id: 1796 },
    },

    recorder: recorderAttr,

    management: managementAttr,
    managementOther: managementOtherAttr,

    grazing: grazingAttr,
    grazingAnimals: grazingAnimalsAttr,
    grazingAnimalsCount: { remote: { id: 1747 } },

    community: {
      menuProps: { label: 'Community', icon: listOutline },
      pageProps: {
        attrProps: {
          input: 'radio',
          inputProps: { options: communityOptions },
        },
      },
      remote: { id: 1770, values: communityOptions },
    },
    habitatDescription: { remote: { id: 1637 } },

    soil: soilAttr,
    woodCover: woodCoverAttr,
    rock: rockAttr,
    litter: litterAttr,
    lichens: lichensAttr,
  },

  occ: {
    attrs: {
      grid: { remote: { id: 153 } },
      coverDomin: { remote: { id: 214, values: dominCoverValues } },
      coverBB: { remote: { id: 890, values: bbCoverValues } },
      coverPresence: { remote: { id: 894, values: presenceCoverValues } },
      coverPercentage: { remote: { id: 891 } },
      coverCount: { remote: { id: 892 } },
      coverFrequency: { remote: { id: 893 } },
    },

    create({ Occurrence: AppOccurrence, taxon, grid }) {
      return new AppOccurrence({ attrs: { taxon, grid } });
    },

    verify: attrs =>
      object({
        cover: z.string({ required_error: 'Cover is missing' }),
      }).safeParse(attrs).error,
  },

  create({ Sample }) {
    const sample = new Sample({
      metadata: {
        surveyId: survey.id,
        survey: survey.name,
      },
      attrs: {
        training: appModel.attrs.useTraining,
      },
    });

    return sample;
  },
};

export default survey;
