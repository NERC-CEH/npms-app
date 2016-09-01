<ul class="table-view core inputs no-top <%- obj.isSynchronising ? 'disabled' : '' %>">
  <li class="table-view-cell">
    <a href="#records/<%- obj.id %>/edit/location" id="location-button"
       class="navigate-right">
      <span class="media-object pull-left icon icon-location"></span>
      <span class="media-object pull-right descript"><%- obj.location %></span>
      Location
    </a>
  </li>
  <li class="table-view-cell">
    <a href="#records/<%- obj.id %>/edit/date" id="date-button"
       class="navigate-right">
      <span class="media-object pull-left icon icon-calendar"></span>
      <span class="media-object pull-right descript"><%- obj.date %></span>
      Date
    </a>
  </li>
  <li class="table-view-cell">
    <a href="#records/<%- obj.id %>/edit/comment" id="comment-button"
       class="navigate-right">
      <span class="media-object pull-left icon icon-comment"></span>
      <span class="media-object pull-right descript"><%= obj.comment %></span>
      Comment
    </a>
  </li>
</ul>
