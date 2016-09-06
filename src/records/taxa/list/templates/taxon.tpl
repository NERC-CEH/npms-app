
  <a href="#records/<%- obj.id %>/edit/taxa/<%- obj.occId %>/edit" class="mobile">
    <div class="media-object pull-left photo"><%= obj.img %></div>

    <div class="media-body">
      <% if (!obj.abundance) { %>
      <div class="abundance error">Missing cover</div>
      <% } else {%>
      <div class="abundance"><%= obj.abundance %></div>
      <% } %>

      <% if (obj.common_name) { %>
      <div class="common-name"><%= obj.common_name %></div>
      <% } %>
      <div class="scientific-name"><%= obj.scientific_name %></div>
    </div>
  </a>

  <div class="mobile-swipe-edit">
    <div id="delete" class="delete icon icon-delete"></div>
  </div>