<div class="info-message" style="text-align: left;">
  <p>Please enter in the box how much of the vegetation falls in to each category where:
  <ul>
    <li>0 = 0</li>
    <li>1 = < 1/3rd</li>
    <li>2 = between 1/3rd and 2/3rds </li>
    <li>3= >2/3rds </li>
  </ul>
  E.g. if up to 1/3rd is 30-100cm enter 1 in the box.
  </p>
</div>
<div class="input-group">
  <label for="<=10cm"><=10cm:</label>
  <input type="number" name="<=10cm" value="<%= obj.value['<=10cm'] %>"/>
</div>
<div class="input-group">
  <label for="11-30cm"><=11-30cm:</label>
  <input type="number" name="11-30cm" value="<%= obj.value['11-30cm'] %>"/>
</div>
<div class="input-group">
  <label for="31-100cm">31-100cm:</label>
  <input type="number" name="31-100cm" value="<%= obj.value['31-100cm'] %>"/>
</div>
<div class="input-group">
  <label for="101-300cm">101-300cm</label>
  <input type="number" name="101-300cm" value="<%= obj.value['101-300cm'] %>"/>
</div>
<div class="input-group">
  <label for=">300cm">>300cm</label>
  <input type="number" name=">300cm" value="<%= obj.value['>300cm'] %>"/>
</div>