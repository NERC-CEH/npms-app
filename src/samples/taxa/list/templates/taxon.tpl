
  <a href="#samples/<%- obj.id %>/edit/taxa/<%- obj.occId %>/edit" class="mobile">
    <% if (obj.img) { %>
      <div class="media-object pull-left photo">
      <span class="delete icon icon-cancel" style="position: absolute; color: white;"></span>
        <img src="<%- obj.img %>" alt="">
      </div>
    <% } else {%>
      <div class="media-object pull-left photo img-picker">
        <input type="file" accept="image/*" style="width: 60px;"/>
        <span class="icon icon-camera" style="margin-top: 20px;"></span>
      </div>
    <% } %>

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