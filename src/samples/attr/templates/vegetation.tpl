<div class="info-message" style="text-align: left;">
  <p>Please enter how much of the vegetation falls in to each category.</p>
</div>

<div class="vegetation-page-radio-group">
  <h5><=10cm</h5>

  <label class="container">
    0
    <input type="radio" name="<=10cm" value="0" <%= obj.value['<=10cm'] == '0' ? 'checked' : '' %>>
    <span class="checkmark"></span>
  </label>
  <label class="container">
    1/3rd
    <input type="radio" name="<=10cm" value="1" <%= obj.value['<=10cm'] == '1' ? 'checked' : '' %>>
    <span class="checkmark"></span>
  </label>
  <label class="container">
    1/3rd to 2/3rds
    <input type="radio" name="<=10cm" value="2" <%= obj.value['<=10cm'] == '2' ? 'checked' : '' %>>
    <span class="checkmark"></span>
  </label>
  <label class="container">
    over 2/3rds
    <input type="radio" name="<=10cm" value="3" <%= obj.value['<=10cm'] == '3' ? 'checked' : '' %>>
    <span class="checkmark"></span>
  </label>
</div>

<div class="vegetation-page-radio-group">
  <h5>11-30cm</h5>

  <label class="container">
    0
    <input type="radio" name="11-30cm" value="0" <%= obj.value['11-30cm'] == '0' ? 'checked' : '' %>>
    <span class="checkmark"></span>
  </label>
  <label class="container">
    1/3rd
    <input type="radio" name="11-30cm" value="1" <%= obj.value['11-30cm'] == '1' ? 'checked' : '' %>>
    <span class="checkmark"></span>
  </label>
  <label class="container">
    1/3rd to 2/3rds
    <input type="radio" name="11-30cm" value="2" <%= obj.value['11-30cm'] == '2' ? 'checked' : '' %>>
    <span class="checkmark"></span>
  </label>
  <label class="container">
    over 2/3rds
    <input type="radio" name="11-30cm" value="3" <%= obj.value['11-30cm'] == '3' ? 'checked' : '' %>>
    <span class="checkmark"></span>
  </label>
</div>

<div class="vegetation-page-radio-group">
  <h5>31-100cm</h5>

  <label class="container">
    0
    <input type="radio" name="31-100cm" value="0" <%= obj.value['31-100cm'] == '0' ? 'checked' : '' %>>
    <span class="checkmark"></span>
  </label>
  <label class="container">
    1/3rd
    <input type="radio" name="31-100cm" value="1" <%= obj.value['31-100cm'] == '1' ? 'checked' : '' %>>
    <span class="checkmark"></span>
  </label>
  <label class="container">
    1/3rd to 2/3rds
    <input type="radio" name="31-100cm" value="2" <%= obj.value['31-100cm'] == '2' ? 'checked' : '' %>>
    <span class="checkmark"></span>
  </label>
  <label class="container">
    over 2/3rds
    <input type="radio" name="31-100cm" value="3" <%= obj.value['31-100cm'] == '3' ? 'checked' : '' %>>
    <span class="checkmark"></span>
  </label>
</div>

<div class="vegetation-page-radio-group">
  <h5>101-300cm</h5>

  <label class="container">
    0
    <input type="radio" name="101-300cm" value="0" <%= obj.value['101-300cm'] == '0' ? 'checked' : '' %>>
    <span class="checkmark"></span>
  </label>
  <label class="container">
    1/3rd
    <input type="radio" name="101-300cm" value="1" <%= obj.value['101-300cm'] == '1' ? 'checked' : '' %>>
    <span class="checkmark"></span>
  </label>
  <label class="container">
    1/3rd to 2/3rds
    <input type="radio" name="101-300cm" value="2" <%= obj.value['101-300cm'] == '2' ? 'checked' : '' %>>
    <span class="checkmark"></span>
  </label>
  <label class="container">
    over 2/3rds
    <input type="radio" name="101-300cm" value="3" <%= obj.value['101-300cm'] == '3' ? 'checked' : '' %>>
    <span class="checkmark"></span>
  </label>
</div>

<div class="vegetation-page-radio-group">
  <h5>>300cm</h5>

  <label class="container">
    0
    <input type="radio" name=">300cm" value="0" <%= obj.value['>300cm'] == '0' ? 'checked' : '' %>>
    <span class="checkmark"></span>
  </label>
  <label class="container">
    1/3rd
    <input type="radio" name=">300cm" value="1" <%= obj.value['>300cm'] == '1' ? 'checked' : '' %>>
    <span class="checkmark"></span>
  </label>
  <label class="container">
    1/3rd to 2/3rds
    <input type="radio" name=">300cm" value="2" <%= obj.value['>300cm'] == '2' ? 'checked' : '' %>>
    <span class="checkmark"></span>
  </label>
  <label class="container">
    over 2/3rds
    <input type="radio" name=">300cm" value="3" <%= obj.value['>300cm'] == '3' ? 'checked' : '' %>>
    <span class="checkmark"></span>
  </label>
</div>

</div>