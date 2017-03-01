<% if (obj.taxon) { %>
<a href="#samples/<%- obj.id %><%- obj.onDatabase ? '' : '/edit' %>" class="mobile">
  <% } else { %>
  <a href="#samples/<%- obj.id %>/edit/" class="mobile">
    <% } %>
    <div class="media-object pull-left photo"><%= obj.img %></div>
    <div class="pull-right">
      <% if (obj.saved) { %>
      <% if (obj.isSynchronising) { %>
      <div class="online-status icon icon-plus spin"></div>
      <% } else { %>
      <div class="online-status icon icon-send <%- obj.onDatabase ? 'cloud' : 'local' %>"></div>
      <% } %>
      <% } %>
      <% if (obj.group) { %>
      <div class="group-status icon icon-users"></div>
      <% } %>
    </div>

    <div class="media-body">
      <% if (!obj.plot) { %>
      <div class="gridref error">Plot is missing</div>
      <% } else { %>
      <div class="gridref"><%= obj.square %></div>
      <div class="plot">Plot <%= obj.plot %></div>
      <% } %>

      <div class="level"><%= obj.level %> survey</div>

      <% if (obj.date) { %>
      <div class="date"><%= obj.date %></div>
      <% } else { %>
      <div class="date error">Date</div>
      <% } %>
    </div>
  </a>

  <div class="mobile-swipe-edit">
    <div id="delete" class="delete icon icon-delete"></div>
  </div>