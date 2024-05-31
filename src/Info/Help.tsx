import { Page, Main, Header, Collapse } from '@flumens';

export default () => (
  <Page id="help">
    <Header title="Help" />
    <Main className="ion-padding">
      <h3 className="list-title">Records</h3>
      <div className="rounded-list">
        <Collapse title="Searching for species">
          <p className="p-2">
            For quicker searching of the taxa you can use different shortcuts.
            For example, to find <i>Linum catharticum</i> you can type in the
            search bar:
            <br />
            <i>lin cat</i> <br />
            <i>l cat</i>
            <br />
            <i>l .cum</i>
            <br />
            <br />
            <b>Note:</b> searches can also be made using common names.
          </p>
        </Collapse>

        <Collapse title="Uploading">
          <p className="p-2">
            All your saved records will be shown on the home page. By default a
            record is in <i>draft</i> mode until it is set for submission. While
            it is in <i>draft</i> mode the application will not upload your
            record to the database. To set it for uploading, open the record and
            press the Upload button in the header.
            <br />
            <br />
            Once it has successfully reached the database the record becomes
            unavailable for new edits. To further edit it please use the
            website.
            <br />
            <br />
            <b>Note:</b> you have to be signed in to your website account and
            have a network connection, for the records to be automatically
            uploaded in the background.
          </p>
        </Collapse>
        <Collapse title="Delete a record">
          <p className="p-2">
            To delete a record, swipe it left in the home-list page and click
            the delete button. You can also delete all the locally saved records
            that have been successfully uploaded with the database.
            <br />
            <br />
            Deleting will leave the records on the database untouched.
          </p>
        </Collapse>
      </div>

      <p className="mt-10 text-sm ">
        For more help, please email the coordinator at{' '}
        <a href="mailto:support@npms.org.uk">support@npms.org.uk</a>.
      </p>
    </Main>
  </Page>
);
