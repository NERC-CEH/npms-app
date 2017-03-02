<ul class="table-view">
<%
  Object.keys(obj.squares).forEach(function(squareKey) {
  var square = obj.squares[squareKey];
  %>

<li class="table-view-divider dark">Square <%= square.sref %></li>
  <%
  Object.keys(square.plots).forEach(function(plotKey) {
  var plot = square.plots[plotKey];
  %>

  <li class="table-view-cell" data-id="<%- plotKey %>">Plot <%= plot.sref %></li>

  <% }) %>
<% }) %>
</ul>