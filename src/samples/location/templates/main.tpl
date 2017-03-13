<ul class="table-view">
  <% if (!Object.keys(obj.squares).length) { %>
  <li class="table-view-cell">Sorry, you have no plots to select.
    </br>Please create your plots at the main NPMS website.</li>
  <% } %>
<%
  Object.keys(obj.squares).forEach(function(squareKey) {
  var square = obj.squares[squareKey];
  %>

<li class="table-view-divider dark">Square <%= square.sref %></li>
  <%
  Object.keys(square.plots).forEach(function(plotKey) {
  var plot = square.plots[plotKey];
  %>

  <li class="table-view-cell wide" data-id="<%- plotKey %>">
    <b><%= plot.label ? plot.label : 'Plot' %>:</b> <%= plot.sref %>
  </li>

  <% }) %>
<% }) %>
</ul>