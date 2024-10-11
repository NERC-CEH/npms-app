import { observer } from 'mobx-react';
import { device, getRelativeDate, VirtualList } from '@flumens';
import { IonItemDivider, IonLabel, IonList } from '@ionic/react';
import samplesCollection, { byPortal } from 'models/collections/samples';
import Sample, { bySurveyDate } from 'models/sample';
import userModel from 'models/user';
import InfoBackgroundMessage from 'Components/InfoBackgroundMessage';
import Survey from './Survey';
import './styles.scss';

// https://stackoverflow.com/questions/47112393/getting-the-iphone-x-safe-area-using-javascript
const rawSafeAreaTop =
  getComputedStyle(document.documentElement).getPropertyValue('--sat') || '0px';
const SAFE_AREA_TOP = parseInt(rawSafeAreaTop.replace('px', ''), 10);
const LIST_PADDING = 90 + SAFE_AREA_TOP;
const LIST_ITEM_HEIGHT = 75 + 10; // 10px for padding
const LIST_ITEM_DIVIDER_HEIGHT = 38;

function roundDate(date: number) {
  let roundedDate = date - (date % (24 * 60 * 60 * 1000)); // subtract amount of time since midnight
  roundedDate += new Date().getTimezoneOffset() * 60 * 1000; // add on the timezone offset
  return new Date(roundedDate);
}

const reachedBottom = false;

const canFetch = () => userModel.isLoggedIn() && device.isOnline;

const Uploaded = () => {
  const uploaded = (sample: Sample) => sample.syncedAt;
  const uploadedSurveys = samplesCollection
    .filter(byPortal(userModel.isPlantPortal() ? 'pp' : 'npms'))
    .filter(uploaded)
    .sort(bySurveyDate);

  const surveys = uploadedSurveys;

  const dates: any = [];
  const dateIndices: any = [];

  const groupedSurveys: any = [];
  let counter: any = {};

  const extraxtDates: (
    value: any,
    index: number,
    array: any[]
  ) => void = survey => {
    const date = roundDate(new Date(survey.attrs.date).getTime()).toString();
    if (!dates.includes(date) && date !== 'Invalid Date') {
      dates.push(date);
      dateIndices.push(groupedSurveys.length);
      counter = { date, count: 0 };
      groupedSurveys.push(counter);
    }

    counter.count += 1;
    groupedSurveys.push(survey);
  };
  [...surveys].forEach(extraxtDates);

  // eslint-disable-next-line react/no-unstable-nested-components
  const Item = ({ index, ...itemProps }: { index: number }) => {
    if (dateIndices.includes(index)) {
      const { date, count } = groupedSurveys[index];
      return (
        <IonItemDivider key={date} style={(itemProps as any).style} mode="ios">
          <IonLabel>{getRelativeDate(date)}</IonLabel>
          {count > 1 && <IonLabel slot="end">{count}</IonLabel>}
        </IonItemDivider>
      );
    }

    const sample = groupedSurveys[index];
    if (!sample) return null;
    //   return (
    //     <IonItem detail={false} {...itemProps} className="survey-list-loader">
    //       <div>
    //         <IonSpinner />
    //       </div>
    //     </IonItem>
    //   );
    // }

    return <Survey key={sample.cid} sample={sample} {...itemProps} />;
  };

  const buffer = reachedBottom || !canFetch() ? 0 : 1; // extra one for spinner
  const itemCount = surveys.length + dateIndices.length + buffer;

  const getItemSize = (index: number) =>
    dateIndices.includes(index) ? LIST_ITEM_DIVIDER_HEIGHT : LIST_ITEM_HEIGHT;

  if (!surveys.length) {
    return (
      <IonList>
        <InfoBackgroundMessage className="mb-[10vh] mt-[20vh]">
          No uploaded surveys
        </InfoBackgroundMessage>
      </IonList>
    );
  }

  return (
    <IonList>
      <VirtualList
        itemCount={itemCount}
        itemSize={getItemSize}
        Item={Item}
        topPadding={LIST_PADDING}
        bottomPadding={LIST_ITEM_HEIGHT / 2}
      />
    </IonList>
  );
};

export default observer(Uploaded);
