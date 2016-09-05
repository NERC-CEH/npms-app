<ul class="table-view core inputs no-top <%- obj.isSynchronising ? 'disabled' : '' %>">
  <li class="table-view-cell">
    <a href="#records/<%- obj.id %>/edit/habitat" class="navigate-right">
      <span class="media-object pull-left icon icon-habitat"></span>
      <span class="media-object pull-right descript"><%- obj.habitat %></span>
      Habitat
    </a>
  </li>
  <li class="table-view-cell">
    <a href="#records/<%- obj.id %>/edit/fine-habitat"
       class="navigate-right <%- obj.habitat ? '' : 'disabled' %>">
      <span class="media-object pull-left icon icon-habitat"></span>
      <span class="media-object pull-right descript"><%- obj['fine-habitat'] %></span>
      Fine Habitat
    </a>
  </li>
  <li class="table-view-cell">
    <a href="#records/<%- obj.id %>/edit/taxa" class="navigate-right">
      <span class="media-object pull-left icon icon-plant"></span>
      Species
    </a>
  </li>
  <li class="table-view-cell">
    <a href="#records/<%- obj.id %>/edit/location" id="location-button"
       class="navigate-right disabled">
      <span class="media-object pull-left icon icon-location"></span>
      <span class="media-object pull-right descript">
        <%- obj.gridref %> </br>
        Plot <%- obj.plot %>
      </span>
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
    <a href="#records/<%- obj.id %>/edit/identifiers" class="navigate-right">
      <span class="media-object pull-left icon icon-user-plus"></span>
      <span class="media-object pull-right descript"><%- obj.identifiers %></span>
      Identifiers
    </a>
  </li>
  <li class="table-view-cell">
    <a href="#records/<%- obj.id %>/edit/additional" class="navigate-right">
      <span class="media-object pull-left icon icon-additional"></span>
      Additional Info
    </a>
  </li>
</ul>
