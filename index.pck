GDPC                                                                            
      res://default_env.tres  �      �       um�`�N��<*ỳ�8   res://nodes/input field.tscn�      �      �ÙQ�/��S���9�   res://project.binary�,      �      ��2]�낍R�:=m7�   res://scenes/main.tscn  �      *      �y��Pf�9K���k�   res://scripts/input.gd.remap@,      (       ڷl�?#)�A�ƅ���   res://scripts/input.gdc �      j      y<F(�j�����K�   res://scripts/main.gd.remap p,      '       +\9Ur�� ��')0�j   res://scripts/main.gdc         P      8%����i���Wť�4   res://scripts/weight&balance/computation.gd.remap   �,      =       �p,�W�)�1���,   res://scripts/weight&balance/computation.gdcp'      �      x�~�1����0V	^�        [gd_resource type="Environment" load_steps=2 format=2]

[sub_resource type="ProceduralSky" id=1]

[resource]
background_mode = 2
background_sky = SubResource( 1 )
             [gd_scene load_steps=2 format=2]

[ext_resource path="res://scripts/input.gd" type="Script" id=1]

[node name="input" type="Container"]
margin_right = 400.0
margin_bottom = 30.0
rect_min_size = Vector2( 500, 30 )
script = ExtResource( 1 )
input_node = NodePath("input")
warning_node = NodePath("warning")
label_node = NodePath("label")

[node name="label" type="Label" parent="."]
margin_top = 5.0
margin_right = 150.0
margin_bottom = 25.0
rect_min_size = Vector2( 150, 20 )
text = "text"
align = 2
valign = 1

[node name="input" type="LineEdit" parent="."]
margin_left = 160.0
margin_top = 3.0
margin_right = 235.0
margin_bottom = 27.0
rect_min_size = Vector2( 75, 24 )
caret_blink = true
caret_blink_speed = 0.5

[node name="warning" type="Label" parent="."]
margin_left = 250.0
margin_top = 5.0
margin_right = 636.0
margin_bottom = 25.0
rect_min_size = Vector2( 0, 20 )
text = "warning"
valign = 1

[connection signal="text_changed" from="input" to="." method="_on_input_text_changed"]
   [gd_scene load_steps=4 format=2]

[ext_resource path="res://scripts/weight&balance/computation.gd" type="Script" id=1]
[ext_resource path="res://scripts/main.gd" type="Script" id=2]
[ext_resource path="res://nodes/input field.tscn" type="PackedScene" id=3]

[node name="main" type="ColorRect"]
anchor_right = 1.0
anchor_bottom = 1.0
color = Color( 0.266667, 0.278431, 0.298039, 1 )
script = ExtResource( 2 )
select_aircraft_node = NodePath("input page")

[node name="home screen" type="Control" parent="."]

[node name="input page" type="VBoxContainer" parent="."]
margin_right = 1024.0
margin_bottom = 600.0
script = ExtResource( 1 )
aircraft_dropdown_node = NodePath("select aircraft/HBoxContainer/aircraft dropdown")
weight_field_node = NodePath("select aircraft/weight input")
cg_field_node = NodePath("select aircraft/cg input")

[node name="select aircraft" type="VBoxContainer" parent="input page"]
margin_right = 1024.0
margin_bottom = 98.0

[node name="HBoxContainer" type="HBoxContainer" parent="input page/select aircraft"]
margin_right = 1024.0
margin_bottom = 30.0

[node name="select aircraft label" type="Label" parent="input page/select aircraft/HBoxContainer"]
margin_right = 100.0
margin_bottom = 30.0
rect_min_size = Vector2( 100, 30 )
text = "Select Aircraft:"
valign = 1

[node name="aircraft dropdown" type="OptionButton" parent="input page/select aircraft/HBoxContainer"]
margin_left = 104.0
margin_right = 154.0
margin_bottom = 30.0
rect_min_size = Vector2( 50, 20 )

[node name="weight input" parent="input page/select aircraft" instance=ExtResource( 3 )]
margin_top = 34.0
margin_right = 1024.0
margin_bottom = 64.0
label_text = "Weight (lb):"
lower_bound = 0.001

[node name="cg input" parent="input page/select aircraft" instance=ExtResource( 3 )]
margin_top = 68.0
margin_right = 1024.0
margin_bottom = 98.0
label_text = "Arm (in):"
lower_bound = 0.001

[node name="Loading" type="VBoxContainer" parent="input page"]
margin_top = 102.0
margin_right = 1024.0
margin_bottom = 268.0

[node name="Label" type="Label" parent="input page/Loading"]
margin_right = 1024.0
margin_bottom = 30.0
rect_min_size = Vector2( 100, 30 )
rect_pivot_offset = Vector2( 31, 7 )
text = "Aircraft Loading"
valign = 1

[node name="pilot" parent="input page/Loading" instance=ExtResource( 3 )]
margin_top = 34.0
margin_right = 1024.0
margin_bottom = 64.0
label_text = "Front Seats (lb):"

[node name="rear seats2" parent="input page/Loading" instance=ExtResource( 3 )]
margin_top = 68.0
margin_right = 1024.0
margin_bottom = 98.0
label_text = "Rear Seats (lb):"

[node name="Standard baggage" parent="input page/Loading" instance=ExtResource( 3 )]
margin_top = 102.0
margin_right = 1024.0
margin_bottom = 132.0
label_text = "Std Bag Compt. (lb):"

[node name="Baggage tube" parent="input page/Loading" instance=ExtResource( 3 )]
margin_top = 136.0
margin_right = 1024.0
margin_bottom = 166.0
label_text = "Baggage Tube (lb):"

[node name="Fuel" type="VBoxContainer" parent="input page"]
margin_top = 272.0
margin_right = 1024.0
margin_bottom = 370.0

[node name="Label" type="Label" parent="input page/Fuel"]
margin_right = 1024.0
margin_bottom = 30.0
rect_min_size = Vector2( 100, 30 )
rect_pivot_offset = Vector2( 31, 7 )
text = "Fuel"
valign = 1

[node name="begin fuel" parent="input page/Fuel" instance=ExtResource( 3 )]
margin_top = 34.0
margin_right = 1024.0
margin_bottom = 64.0
label_text = "Fuel (gal):"
upper_bound = 50.0

[node name="fuel use" parent="input page/Fuel" instance=ExtResource( 3 )]
margin_top = 68.0
margin_right = 1024.0
margin_bottom = 98.0
label_text = "Fuel Use (gal):"
upper_bound = 50.0

[node name="results page" type="Control" parent="."]
margin_right = 40.0
margin_bottom = 40.0

[connection signal="item_selected" from="input page/select aircraft/HBoxContainer/aircraft dropdown" to="input page" method="_on_aircraft_dropdown_item_selected"]
      GDSC      
   .   �      ���Ӷ���   ���������¶�   ����������Ҷ   ����������Ҷ   ���������Ӷ�   �����������Ӷ���   ���������Ӷ�   ����¶��   �������Ӷ���   ������Ѷ   ����ڶ��   ����Ӷ��   ����������Ӷ   �����϶�   ���¶���   ���������������������Ҷ�   ��������Ӷ��   �������Ӷ���   �������¶���   �������������¶�      text         ���W���                         �?      Invalid Value                Value Out of Range                                             "      (   	   .   
   /      8      A      J      K      R      Y      Z      `      f      o      v      w      x      �      �      �      �      �      �      �      �       �   !   �   "   �   #   �   $   �   %   �   &   �   '   �   (   �   )   �   *   �   +   �   ,   �   -   �   .   3YY8;�  V�  Y8;�  V�  �  Y8;�  V�  �  YY8;�  V�  Y8;�  V�  Y8;�  V�  YY5;�  �  P�  QY5;�	  �  P�  QY5;�
  �  P�  QYY;�  V�  �  Y;�  V�  �  YY0�  PQV�  �
  T�  �  �  �  T�  �>  P�  Q�  �  P�  T�  Q�  YY0�  P�  V�  R�  V�  �  QV�  �  T�  �  �  �  T�  �  �  �  �  �  �  P�  T�  QYYY0�  P�  QV�  �  �  T�  PQ�  &�  V�  �  �  P�  Q�  �?  P�  Q�  �	  T�  �  �  (V�  �  �  �  �	  T�  �  �  .�  �  &�  	�  �  �  V�  �  �  �  �	  T�  �	  �  Y`      GDSC            S      ������ڶ   �������������������Ӷ���   ��������������¶   ���Ӷ���   �������Ӷ���   ������������¶��   �������������������Ѷ���   �����϶�   �����������������ض�   ��������   ����Ӷ��   �����¶�   �����������¶���   �����������¶���   �  [{"id": "N103UV","weight": 1767.89,"cg": 96.598,"takeoff_weight": 2646.0,"landing_weight": 2407.0,"long_range?": true},{"id": "104UV","weight": 1735.86,"cg": 96.99,"takeoff_weight": 2646.0,"landing_weight": 2407.0,"long_range?": true},{"id": "105UV","weight": 1754.86,"cg": 96.85,"takeoff_weight": 2646.0,"landing_weight": 2407.0,"long_range?": true},{"id": "106UV","weight": 1771.86,"cg": 97.07,"takeoff_weight": 2646.0,"landing_weight": 2407.0,"long_range?": true},{"id": "107UV","weight": 1844.80,"cg": 98.4,"takeoff_weight": 2646.0,"landing_weight": 2535.0,"long_range?": true},{"id": "108UV","weight": 1777.00,"cg": 96.58,"takeoff_weight": 2646.0,"landing_weight": 2535.0,"long_range?": true},{"id": "109UV","weight": 1813.33,"cg": 97.6,"takeoff_weight": 2646.0,"landing_weight": 2535.0,"long_range?": false},{"id": "110UV","weight": 1815.90,"cg": 97.45,"takeoff_weight": 2646.0,"landing_weight": 2535.0,"long_range?": false},{"id": "112UV","weight": 1815.24,"cg": 97.25,"takeoff_weight": 2646.0,"landing_weight": 2535.0,"long_range?": false},{"id": "113UV","weight": 1815.64,"cg": 97.52,"takeoff_weight": 2646.0,"landing_weight": 2535.0,"long_range?": false},{"id": "114UV","weight": 1810.04,"cg": 97.32,"takeoff_weight": 2646.0,"landing_weight": 2535.0,"long_range?": false},{"id": "115UV","weight": 1808.94,"cg": 97.36,"takeoff_weight": 2646.0,"landing_weight": 2535.0,"long_range?": false},{"id": "116UV","weight": 1808.76,"cg": 97.16,"takeoff_weight": 2646.0,"landing_weight": 2535.0,"long_range?": false},{"id": "118UV","weight": 1817.35,"cg": 97.46,"takeoff_weight": 2646.0,"landing_weight": 2535.0,"long_range?": false},{"id": "119UV","weight": 1813.42,"cg": 97.65,"takeoff_weight": 2646.0,"landing_weight": 2535.0,"long_range?": false},{"id": "749DS","weight": 1799.10,"cg": 98.13,"takeoff_weight": 2646.0,"landing_weight": 2535.0,"long_range?": true},{"id": "779US","weight": 1789.94,"cg": 98.33,"takeoff_weight": 2646.0,"landing_weight": 2407.0,"long_range?": true},{"id": "793US","weight": 1800.84,"cg": 98.01,"takeoff_weight": 2646.0,"landing_weight": 2535.0,"long_range?": true},{"id": "4012X","weight": 1794.56,"cg": 99.22,"takeoff_weight": 2646.0,"landing_weight": 2535.0,"long_range?": true}]                     	      
                           	      
   %      &      '      (      )      *      +      ,      -      .      8      >      ?      @      G      H      N      Q      3YY8;�  V�  YY5;�  V�  �  P�  QYY;�  Y;�  YY0�  PQV�  �  YYYYY�  �  �  ;�  �	  T�
  P�  Q�  �  �  T�  �  �  �  �  T�  P�  QYY0�  PQV�  .�  Y`GDSC      	   %   �      ���Ӷ���   ���������������������Ӷ�   ����������������Ӷ��   ������������Ӷ��   ����������������ض��   �������Ӷ���   �����������Ҷ���   �������Ҷ���   ������������¶��   ����������������¶��   �����϶�   �������۶���$   ����������������������������������Ҷ   �����������¶���   ����������������¶��   �������¶���   ����ζ��   ��������Ӷ��            [Manual Entry]               id        weight               cg        0                            	                        !      ,   	   7   
   8      =      E      F      L      M      T      Y      Z      [      \      c      g      m      w      x      y      z      �      �      �      �       �   !   �   "   �   #   �   $   �   %   3YY8;�  V�  Y8;�  V�  Y8;�  V�  YY5;�  V�  P�  QY5;�  V�  P�  QY5;�  V�  P�  QYY;�  V�  Y;�	  V�  YY0�
  PQV�  �  �  T�  P�  Q�  �  P�  Q�  YYY0�  P�  QV�  �  �  �  )�  �  V�  �  T�  P�  L�  MQYYYY0�  P�  QV�  �	  �  �  &�  V�  �  T�  P�>  P�  L�	  ML�  MQR�  Q�  �  T�  P�>  P�  L�	  ML�  MQR�  Q�  (V�  �  T�  P�  R�  Q�  �  T�  P�  R�  Q�  Y`              [remap]

path="res://scripts/input.gdc"
        [remap]

path="res://scripts/main.gdc"
         [remap]

path="res://scripts/weight&balance/computation.gdc"
   ECFG      application/config/name(         Peabody's Performance Computer     application/run/main_scene          res://scenes/main.tscn  +   gui/common/drop_mouse_on_gui_input_disabled         )   physics/common/enable_pause_aware_picking         $   rendering/quality/driver/driver_name         GLES2   %   rendering/vram_compression/import_etc         &   rendering/vram_compression/import_etc2          )   rendering/environment/default_environment          res://default_env.tres     