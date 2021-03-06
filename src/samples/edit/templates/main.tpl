<% if (obj.training) { %>
<div class="main-header training"></div>
<% } %>

<div id="level-indicator" class="info-message"><%- obj.level %></div>
<ul class="table-view core inputs no-top <%- obj.isSynchronising ? 'disabled' : '' %>">
  <li class="table-view-cell">
    <a href="#samples/<%- obj.id %>/edit/habitat" class="navigate-right">
      <span class="media-object pull-left icon icon-habitat"></span>
      <% if (!obj.habitat) { %>
      <span class="media-object pull-right descript error">
          Required
        <% } else { %>
      <span class="media-object pull-right descript">
          <%- obj.habitat %> </br>
        <% } %>
      </span>
        Broad Habitat
    </a>
  </li>
  <li class="table-view-cell">
    <a href="#samples/<%- obj.id %>/edit/fine-habitat"
       class="navigate-right <%- obj.habitat ? '' : 'disabled' %>">
      <span class="media-object pull-left icon icon-habitat"></span>
      <span class="media-object pull-right descript"><%- obj['fine-habitat'] %></span>
      Fine Habitat
    </a>
  </li>
  <li class="table-view-cell">
    <a href="#samples/<%- obj.id %>/edit/taxa" class="navigate-right">
      <span class="media-object pull-left icon icon-plant"></span>
      <span class="media-object pull-right descript"><%- obj.taxa %></span>
      Species
    </a>
  </li>
  <li class="table-view-cell">
    <a href="#samples/<%- obj.id %>/edit/location" id="location-button"
       class="navigate-right">
      <span class="media-object pull-left icon icon-location"></span>
      <% if (!obj.plot) { %>
      <span class="media-object pull-right descript error">
          Required
        <% } else { %>
      <span class="media-object pull-right descript">
          <%- obj.square %> </br>
          <%- obj.plot %>
        <% } %>
      </span>
      Location
    </a>
  </li>
  <li class="table-view-cell">
    <a href="#samples/<%- obj.id %>/edit/date" id="date-button"
       class="navigate-right">
      <span class="media-object pull-left icon icon-calendar"></span>
      <span class="media-object pull-right descript"><%- obj.date %></span>
      Date
    </a>
  </li>
  <li class="table-view-cell">
    <a href="#samples/<%- obj.id %>/edit/identifiers" class="navigate-right">
      <span class="media-object pull-left icon icon-user-plus"></span>
      <% if (!obj.identifiers) { %>
      <span class="media-object pull-right descript error">
          Required
        <% } else { %>
      <span class="media-object pull-right descript">
          <%- obj.identifiers %> </br>
        <% } %>
      </span>
      Recorder Names
    </a>
  </li>
  <li class="table-view-cell">
    <a href="#samples/<%- obj.id %>/edit/additional" class="navigate-right">
      <span class="media-object pull-left icon icon-additional"></span>
      Additional Info
    </a>
  </li>
</ul>
