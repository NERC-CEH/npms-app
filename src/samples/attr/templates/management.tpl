<ul class="list">
<% obj.selection.forEach((option) => { %>
  <li class="item item-checkbox item-small">
    <label class="checkbox">
      <input type="checkbox" value="<%= option %>" <%- obj.selected.indexOf(option) >= 0 ? 'checked' : ''%>>
    </label>
    <%= option %>
  </li>
<% }) %>
</ul>

<label for="other">Describe the other management observed.</label>
<input type="text" name="other" class="other" value="<%- obj.otherManagement %>" />