<li class="table-view-divider">Records</li>
<li class="table-view-cell">
  <a id="submit-all-btn">
    <span class="media-object pull-left icon icon-send"></span>
    Submit All
  </a>
</li>
<li class="table-view-cell">
  <a id="delete-all-btn">
    <span class="media-object pull-left icon icon-delete"></span>
    Delete All Saved
  </a>
</li>

<li class="table-view-divider">Application</li>
<li id="use-training-btn-parent" class="table-view-cell">
  Share App Analytics
  <span class="media-object pull-left icon icon-share"></span>
  <div id="send-analytics-btn" data-setting="sendAnalytics"
       class="toggle no-yes <%- obj.sendAnalytics ? 'active' : '' %>">
    <div class="toggle-handle"></div>
  </div>
</li>
<li class="table-view-cell">
  <a id="app-reset-btn">
    <span class="media-object pull-left icon icon-undo"></span>
    Reset
  </a>
</li>
