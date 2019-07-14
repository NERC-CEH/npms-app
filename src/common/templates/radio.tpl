<% if (obj.message) { %>
<div class="info-message">
  <p><%= obj.message %></p>
</div>
<% } %>

<% if (obj.showDefault) { %>
<label class="item item-radio">
  <input type="radio" name="group" value="" <%- !obj.selected ? 'checked' : ''%>>
  <div class="radio-content">
    <div class="item-content">
      ${obj.showDefault}
    </div>
    <i class="radio-icon icon-check"></i>
  </div>
</label>

<% } %>

<% obj.selection.forEach((option) => { %>
<label class="item item-radio">
  <input type="radio" name="group" value="<%= option %>" <%- option === obj.selected ? 'checked' : ''%>>
  <div class="radio-content">
    <div class="item-content">
      ${option}
    </div>
    <i class="radio-icon icon-check"></i>
  </div>
</label>
<% }) %>