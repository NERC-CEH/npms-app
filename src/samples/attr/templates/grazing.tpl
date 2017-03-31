<div class="info-message">
  <p>Which animals were grazing?</p>
</div>

<label class="item item-radio">
  <input type="radio" name="group" value="low"
  <%= obj.value.selected === 'low' ? 'checked' : '' %>>
  <div class="radio-content">
    <div class="item-content">
      low
    </div>
    <i class="radio-icon icon-check"></i>
  </div>
</label>
<label class="item item-radio">
  <input type="radio" name="group" value="moderate"
  <%= obj.value.selected === 'moderate' ? 'checked' : '' %>>
  <div class="radio-content">
    <div class="item-content">
      moderate
    </div>
    <i class="radio-icon icon-check"></i>
  </div>
</label>
<label class="item item-radio">
  <input type="radio" name="group" value="high"
  <%= obj.value.selected === 'high' ? 'checked' : '' %>>
  <div class="radio-content">
    <div class="item-content">
      high
    </div>
    <i class="radio-icon icon-check"></i>
  </div>
</label>
<br>
<br>
<div class="input-group">
  <label for="text">Grazing animals</label>
  <input type="text" name="text" value="<%= obj.value.text %>" placeholder="Which animals"/>
</div>