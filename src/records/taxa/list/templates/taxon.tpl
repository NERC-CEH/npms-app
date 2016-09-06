
  <a href="#records/<%- obj.id %>/edit/taxa/<%- obj.occId %>" class="mobile">
    <div class="media-object pull-left photo"><%= obj.img %></div>

    <div class="media-body">
      <% if (obj.common_name) { %>
      <div class="common-name"><%= obj.common_name %></div>
      <% } %>
      <div class="scientific-name"><%= obj.scientific_name %></div>
    </div>
  </a>

  <div class="mobile-swipe-edit">
    <div id="delete" class="delete icon icon-delete"></div>
  </div>