<div class="info-message">
  <p>This record has been submitted and cannot be edited within this App.
    <% if (obj.id) { %>
    <a href="<%= obj.editUrl %>" class="btn btn-block btn-narrow">
      View on NPMS
      <span class="pull-right icon icon-link-ext"></span>
    </a>
    <% } %>
</div>

<% if (obj.show_survey2) { %>
<button id="survey" class="btn btn-narrow btn-wideish btn-positive btn-block">Add Survey 2 <div class="icon icon-plus"></div></button>
<% } %>

<button id="share" class="btn btn-narrow btn-wideish btn-block">Share <div class="icon icon-export"></div></button>

<ul class="table-view core inputs info">
  <li class="table-view-cell">
    <span class="media-object pull-left icon icon-habitat"></span>
    <span class="media-object pull-right descript"><%- obj.habitat %></span>
    Broad Habitat
  </li>
  <% if (obj['fine-habitat']) { %>
  <li class="table-view-cell">
    <span class="media-object pull-left icon icon-habitat"></span>
    <span class="media-object pull-right descript"><%- obj['fine-habitat'] %></span>
    Fine Habitat
  </li>
  <% } %>
  <li class="table-view-cell">
    <span class="media-object pull-left icon icon-calendar"></span>
    <span class="media-object pull-right descript"><%- obj.taxa %></span>
    Species
  </li>
  <li class="table-view-cell">
    <span class="media-object pull-left icon icon-location"></span>
    <span class="media-object pull-right descript">
        <%- obj.gridref %> </br>
      Plot <%- obj.plot %>
      </span>
    Location
  </li>
  <li class="table-view-cell">
    <span class="media-object pull-left icon icon-calendar"></span>
    <span class="media-object pull-right descript"><%- obj.date %></span>
    Date
  </li>
  <% if (obj.identifiers) { %>
  <li class="table-view-cell">
    <span class="media-object pull-left icon icon-user-plus"></span>
    <span class="media-object pull-right descript"><%- obj.identifiers %></span>
    Recorder Names
  </li>
  <% } %>
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