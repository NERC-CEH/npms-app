<div class="info-message">
  <p>This record has been submitted and cannot be edited within this App.
    Go to the <a href="http://npms.org.uk" target="_blank">NPMS website</a> to edit.</p>

</div>
<ul class="table-view core inputs info no-top">
  <li class="table-view-cell">
    <span class="media-object pull-left icon icon-location"></span>
    <span class="media-object pull-right descript"><%- obj.location %></span>
    Location
  </li>
  <li class="table-view-cell">
    <span class="media-object pull-left icon icon-calendar"></span>
    <span class="media-object pull-right descript"><%- obj.date %></span>
    Date
  </li>
  <% if (obj.comment) { %>
    <li class="table-view-cell">
      <span class="media-object pull-left icon icon-comment"></span>
      Comment
      <span class="comment descript"><%- obj.comment %></span>
    </li>
  <% } %>
  <% if (obj.images.length) { %>
    <li id="img-array">
      <% obj.images.each(function (image){ %>
        <img src="<%- image.getURL() %>" alt="">
      <% }) %>
    </li>
  <% } %>
</ul>

<div id="occurrence-id"><%- obj.id %></div>