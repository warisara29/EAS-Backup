// '.tbl-content' consumed little space for vertical scrollbar, scrollbar width depend on browser/os/platfrom. Here calculate the scollbar width .
$(document).ready(function () {
  $.ajax({
    type: "GET",
    url: "http://127.0.0.1:8000/consumptionData/",
    dataType: "json",
    success: function (data) {
      getData = data;
      //obj = JSON.parse(getData)
      //console.log("obj ",obj)
      getValue = [];
      for (i = 0; i < getData.length; i++) {
        if (getData[i].name) {
          name = getData[i].name;
          value = getData[i].data;
          getValue.push(name, value);
        }
        // getDataList = data.data
      }

      getDate = getData[10];

      getIndex = getData[11];
      console.log("index ", getIndex);

      console.log("get data ", getData);
      console.log("get name ", getValue);
      console.log("get date ", getDate);
      //   console.log("get data list ", getDataList)

      GetData(getData, getValue, getDate, getIndex);
    },
  });
  // get index of select choices
  $.ajax({
    type: "GET",
    url: "http://127.0.0.1:8000/SelectOption/",
    dataType: "json",
    success: function (index) {
      OperationName = index[0];
      SystemName = index[1];

      SliderFix = index[2];
      SliderFix_System = index[3];
      SliderFix_Point = index[4];

      SliderVar = index[5];
      SliderVar_System = index[6];
      SliderVar_Point = index[7];

      HsaFix = index[8];
      HsaFix_System = index[9];
      HsaFix_Point = index[10];

      HsaVar = index[11];
      HsaVar_System = index[12];
      HsaVar_Point = index[13];

      DriveFix = index[14];
      DriveFix_System = index[15];
      DriveFix_Point = index[16];

      DriveVar = index[17];
      DriveVar_System = index[18];
      DriveVar_Point = index[19];

      dateList = index[20];

      console.log("date list", dateList);

      Operation = [];

      for (i = 0; i < OperationName.length; i++) {
        // var check = OperationName.search("None ")
        if (OperationName[i].indexOf("None") !== -1) {
          //console.log("true")
          //Operation.push(OperationName[i])
          //OperationName.remove(OperationName[i])
        } else if (OperationName[i].indexOf("Seagate") !== -1) {
          //console.log("true")
        } else {
          Operation.push(OperationName[i]);
        }
        //console.log("")
      }
      //console.log("OP ", Operation)
      var checkkkk = SliderFix_Point;
      console.log("checkkkk ", checkkkk);

      console.log("log value ", index[2][1]["Value"]);

      Selector(Operation, SystemName);
    },
  });

  $('.chosen-value-operation').select2({
    placeholder: 'Select Operation',
    //theme: "classic"
  });

  $('.chosen-value-systems').select2({
    placeholder: 'Select System',
    //theme: "classic"
  });

  $('.chosen-value-point').select2({
    placeholder: 'Select an option',
    //theme: "classic"
  });

  $('.chosen-value-fullpoint').select2({
    placeholder: 'Select an option',
    //theme: "classic"
  });
});

function GetData(getData, getValue, getDate, getIndex) {
  // console.log("function ", getDate.length);
  // console.log("name ", getData[0].data);
  // console.log("function get index ", getIndex[1].index);
  // console.log("aaaa ", getIndex.length);

  percentList = [];
  len = getDate.length - 1;

  for (percent = 0; percent < len; percent++) {
    //console.log("errrrr ", getIndex[percent].index);
    indexPercent = getIndex[percent].index;
    //console.log("len percent ", len(indexPercent))
    percentList.push(indexPercent);
  }

  head_name = [];
  for (i = 0; i < getDate.length; i++) {
    //console.log(i);
    if (head_name.indexOf(getDate[i]) === -1) {
      head_name.push(getDate[i]);
    }
  }

  //console.log(head_name);

  var table = document.createElement("table");
  table.setAttribute("id", "main-table");
  table.setAttribute("class", "main-table");

  var tr = table.insertRow(-1);

  for (i = 0; i < head_name.length; i++) {
    var th = document.createElement("th");
    th.innerHTML = head_name[i];
    th.colSpan = 2;

    tr.appendChild(th);
  }

  var powerList = ["Opration Name"];
  for (i = 0; i < head_name.length - 1; i++) {
    powerList.push("Used (kW)");
    powerList.push("Percent (%)");
  }

  //console.log("power ", powerList);

  tr = table.insertRow(1);
  for (power = 0; power < powerList.length; power++) {
    var insertPower = tr.insertCell();
    if (power == 0) {
      insertPower.colSpan = 2;
    }
    insertPower.innerHTML = powerList[power];
  }

  for (i = 0; i < getData.length; i++) {
    var name_value = getData[i].name;
    if (name_value) {
      //console.log("get data ",getData[i].name, " ",getData[i].data)
      var loop = getData[i].data;
      var sort_loop = loop.slice();
      var loop_list = [];
      loop_list.push(getData[i].name);
      //loop_list.push(" ")
      for (j = 0; j < sort_loop.length; j++) {
        if (sort_loop[j + 1] == sort_loop[j]) {
          loop_list.push(sort_loop[j]);
        } else {
          loop_list.push(sort_loop[j]);
          //loop_list.push(percentList[0][0])
        }
        loop_list.push(percentList[j][i] + "%");
        // for (percentJ=0; percentJ < head_name.length; percentJ++) {
        //
        // }
      }

      //console.log("len sort ", sort_loop.length);
      //console.log("checkkkkkkkkkkk ", loop_list);
      // console.log(loop_list[0])
      tr = table.insertRow();
      for (k = 0; k < loop_list.length; k++) {
        var insertData = tr.insertCell();
        if (k == 0) {
          insertData.colSpan = 2;
        }
        insertData.innerHTML = loop_list[k];
      }
    }
  }

  var showTable = document.getElementById("table-scroll");
  showTable.innerHTML = "";
  showTable.appendChild(table);

  $("tr")
    .not(":first")
    .hover(
      function () {
        $(this).css("background", "#567ad5");
      },
      function () {
        $(this).css("background", "");
      }
    );
}

// SELECT OPTION OF PART 2

const inputField = document.querySelector(".chosen-value-systems");
const dropdown = document.querySelector(".value-list-systems");
const dropdownArray = document.querySelectorAll("li");
console.log(typeof dropdownArray);
dropdown.classList.add("open");
inputField.focus(); // Demo purposes only
let valueArray = [];
dropdownArray.forEach((item) => {
  valueArray.push(item.textContent);
});

const closeDropdown = () => {
  dropdown.classList.remove("open");
};

inputField.addEventListener("input", () => {
  dropdown.classList.add("open");
  let inputValue = inputField.value.toLowerCase();
  let valueSubstring;
  if (inputValue.length > 0) {
    for (let j = 0; j < valueArray.length; j++) {
      if (
        !(
          inputValue.substring(0, inputValue.length) ===
          valueArray[j].substring(0, inputValue.length).toLowerCase()
        )
      ) {
        dropdownArray[j].classList.add("closed");
      } else {
        dropdownArray[j].classList.remove("closed");
      }
    }
  } else {
    for (let i = 0; i < dropdownArray.length; i++) {
      dropdownArray[i].classList.remove("closed");
    }
  }
});

dropdownArray.forEach((item) => {
  item.addEventListener("click", (evt) => {
    inputField.value = item.textContent;
    dropdownArray.forEach((dropdown) => {
      dropdown.classList.add("closed");
    });
  });
});

inputField.addEventListener("focus", () => {
  inputField.placeholder = "Type to filter";
  dropdown.classList.add("open");
  dropdownArray.forEach((dropdown) => {
    dropdown.classList.remove("closed");
  });
});

inputField.addEventListener("blur", () => {
  inputField.placeholder = "Select state";
  dropdown.classList.remove("open");
});

document.addEventListener("click", (evt) => {
  const isDropdown = dropdown.contains(evt.target);
  const isInput = inputField.contains(evt.target);
  if (!isDropdown && !isInput) {
    dropdown.classList.remove("open");
  }
});

function Selector(Operation, SystemName, UnitName, e) {
  //console.log("Operation ", Operation)
  var selectOP = Operation;
  var series = [];
  console.log("select op 1", selectOP);
  $.each(selectOP, function (item) {
    //console.log("item ",selectOP[item])
    $(".chosen-value-operation").append(
      $("<option></option>").attr("value", selectOP[item]).text(selectOP[item])
    );
  });

  $("#chosen-value-operation").on("change", () => {
    var selected = $(".chosen-value-operation").val();
    //console.log("selectd ", selected);

    $(".chosen-value-point")
      .find("option")
      .remove()
      .end()
      .append(
        $("<option></option>")
          .attr("value", "Select Point")
          .text("Select Point")
      );

    if (selected == "Slider FIX") {
      const Slider_Fix_Overall = SliderFix;
      const Slider_Fix_Point = SliderFix_Point; //difernt value
      const Utility_list = [];

      //console.log("slider fix point ", SliderFix_Point[1].CHILLER.length); // อันนี้ไม่เกี่ยว

      SliderFix_system_list = [];
      SliderFix_Point_list = [];

      for (i = 0; i < Slider_Fix_Point.length; i++) {
        var SliderFix_n = Slider_Fix_Point[i];
        SliderFix_Point_list.push(SliderFix_n);
        SliderFix_system_list.push(Object.keys(SliderFix_n)[0]);
      }
      //console.log("system list ",SliderFix_system_list);
      //console.log("point list ",SliderFix_Point_list);

      $(".chosen-value-systems").find("option").remove().end();
      $.each(SliderFix_system_list, function (item) {
        $(".chosen-value-systems").append(
          $("<option></option>")
            .attr("value", SliderFix_system_list[item])
            .text(SliderFix_system_list[item])
        );
        //console.log(SliderFix_system_list[item])
      });

      $(".chosen-value-systems").on("change", () => {
        SliderFix_list = []; //RENAME LATER
        SliderFix_Value_list = [];

        $(".chosen-value-fullpoint")
          .find("option")
          .remove()
          .end()
          .append(
            $("<option></option>")
              .attr("value", "Select Utility")
              .text("Select Utility")
          );

        var selected_system = $(".chosen-value-systems").val();

        //checkData(selected_system)
        //console.log("slected system ", selected_system);
        SliderFix_Value_list = [];
        SliderFix_point_list = [];

        // FOR TESTTTTTTTTT
        for (i = 0; i < Slider_Fix_Overall.length; i++) {
          var sliderfix_value = Slider_Fix_Overall[i]["System"];
          if (sliderfix_value == selected_system) {
            SliderFix_Value_list.push(Slider_Fix_Overall[i]["Value"]);
            SliderFix_point_list.push(Slider_Fix_Overall[i]["Point"]);
          }
        }
        //console.log("value list ",SliderFix_Value_list)  // record all values of chiller value
        //console.log("value list 356 ",SliderFix_point_list)

        if (selected_system.indexOf(SliderFix_system_list)) {
          //console.log(typeof SliderFix_system_list[1])
          //console.log(Object.values(SliderFix_Point_list))
          for (i = 0; i < SliderFix_Point_list.length; i++) {
            //console.log(SliderFix_Point_list[i][selected_system])
            SliderFix_list.push(SliderFix_Point_list[i][selected_system]);
          }
        }

        //console.log("slider fix list 364",SliderFix_list) //Got value that is include undefind list
        SliderFix_list2 = []; //RENAME LATER
        SliderFix_item_list = [];
        //console.log(SliderFix_list);
        $.each(SliderFix_list, function (item) {
          if (SliderFix_list[item] !== undefined) {
            //Got value that is not undefind
            //console.log("test list ", SliderFix_list[item]);
            //SliderFix_item_list.push(SliderFix_list[item])
            //var testtttt = SliderFix_list[item]

            $.each(SliderFix_list[item], function (item2) {
              SliderFix_item_list.push(SliderFix_list[item][item2]);
              var cut_string = SliderFix_list[item][item2].slice(0, 4);
              //console.log("item2 ", SliderFix_list[item][item2]);
              if (SliderFix_list2.indexOf(cut_string) === -1) {
                SliderFix_list2.push(cut_string);
              }
            });
          }
        });

        for (i = 0; i < SliderFix_list2.length; i++) { }
        //console.log("sliderfix item list 385 ", SliderFix_item_list)
        //console.log("slider fix list2 ", SliderFix_list2);
        $(".chosen-value-point").find("option").remove().end();
        $.each(SliderFix_list2, function (sliderfix) {
          $(".chosen-value-point").append(
            $("<option></option>")
              .attr("value", SliderFix_list2[sliderfix])
              .text(SliderFix_list2[sliderfix])
          );
        });
      });

      //RENAME LATER
      $(".chosen-value-point").on("change", () => {
        SliderFix_list3 = [];
        SliderFix_utility_value = [];
        var selected_utility = $(".chosen-value-point").val();
        //console.log("slected utility ", selected_utility);
        for (i = 0; i < SliderFix_point_list.length; i++) {
          if (SliderFix_point_list[i].indexOf(selected_utility) !== -1) {
            SliderFix_utility_value.push(SliderFix_Value_list[i]);
          }
        }
        //console.log("SliderFix_utility_value 414",SliderFix_utility_value)
        $.each(SliderFix_item_list, function (sliderFix_item) {
          if (
            SliderFix_item_list[sliderFix_item].indexOf(selected_utility) !== -1
          ) {
            //console.log(SliderFix_item_list[sliderFix_item]);
            SliderFix_list3.push(SliderFix_item_list[sliderFix_item]);
          }
        });

        //console.log("list 3 424 ", SliderFix_list3);
        $(".chosen-value-fullpoint").find("option").remove().end();
        $.each(SliderFix_list3, function (test3) {
          $(".chosen-value-fullpoint").append(
            $("<option></option>")
              .attr("value", SliderFix_list3[test3])
              .text(SliderFix_list3[test3])
          );
        });
      });

      $(".chosen-value-fullpoint").on("change", () => {
        var SliderFix_utility_value = [];
        var date = [];
        var selected_full_utility = $(".chosen-value-fullpoint").val();
        var selected_operation = $(".chosen-value-operation").val();
        var selected_system = $(".chosen-value-systems").val();
        console.log("selected_full_utility ", Slider_Fix_Overall);
        for (i = 0; i < Slider_Fix_Overall.length; i++) {
          if (selected_full_utility == Slider_Fix_Overall[i]["Point"]) {
            //console.log("lastttttttt ",Slider_Fix_Overall[i]["Value"])
            SliderFix_utility_value.push(Slider_Fix_Overall[i]["Value"]);
            date.push(Slider_Fix_Overall[i]["Date"]);
          }
        }
        //console.log("SliderFix_utility_value  ",SliderFix_utility_value)
        // PLOT LINE CHERT HERE
        var seriesJson = [
          {
            name: selected_full_utility,
            data: SliderFix_utility_value
          },
        ];
        //series.append(seriesJson)
        checkData(selected_operation, selected_system, date, seriesJson);
      });
    }
    if (selected == "Slider VAR") {
      //const Slider_Fix_system = SliderFix_System;
      const Slider_Var_Overall = SliderVar;
      const Slider_Var_Point = SliderVar_Point; //difernt value
      const Utility_list = [];

      //console.log("slider fix point ", (SliderFix_Point[1].CHILLER).length)
      SliderVar_system_list = [];
      SliderVar_Point_list = [];

      for (i = 0; i < Slider_Var_Point.length; i++) {
        var SliderVar_n = Slider_Var_Point[i];
        SliderVar_Point_list.push(SliderVar_n);
        SliderVar_system_list.push(Object.keys(SliderVar_n)[0]);
      }
      console.log(SliderVar_system_list);

      $(".chosen-value-systems").find("option").remove().end();
      $.each(SliderVar_system_list, function (item) {
        $(".chosen-value-systems").append(
          $("<option></option>")
            .attr("value", SliderVar_system_list[item])
            .text(SliderVar_system_list[item])
        );
        //console.log(SliderFix_system_list[item])
      });

      // SliderVar_list2 = []; //RENAME LATER
      // SliderVar_list3 = []; //RENAME LATER

      $(".chosen-value-systems").on("change", () => {
        SliderVar_list = []; //RENAME LATER
        SliderVar_Value_list = [];

        $(".chosen-value-fullpoint")
          .find("option")
          .remove()
          .end()
          .append(
            $("<option></option>")
              .attr("value", "Select Utility")
              .text("Select Utility")
          );

        //$(".chosen-value-point").find("option").remove().end();

        var append_system = ["selected system"]
        var selected_system = $(".chosen-value-systems").val();
        console.log("slected system ", selected_system);
        append_system.push(selected_system)

        SliderVar_Value_list = [];
        SliderVar_point_list = [];

        for (i = 0; i < Slider_Var_Overall.length; i++) {
          var slidervar_value = Slider_Var_Overall[i]["System"];
          if (slidervar_value == selected_system) {
            SliderVar_Value_list.push(Slider_Var_Overall[i]["Value"]);
            SliderVar_point_list.push(Slider_Var_Overall[i]["Point"]);
          }
        }

        // console.log("value list 506",SliderVar_Value_list)
        // console.log("value list 507 ",SliderVar_point_list)
        $(".chosen-value-point").find("option").remove().end();
        $.each(append_system, function (append) {
          $(".chosen-value-point").append(
            $("<option></option>")
              .attr("value", append_system[append])
              .text(append_system[append])
          );
        })
      });

      $(".chosen-value-point").on("change", () => {
        SliderVar_list3 = ["Select Utility"]; //#############################################################################
        SliderVar_utility_value = ["select utility point"];

        var object_key = []
        var selected_utility = $(".chosen-value-point").val();
        //console.log("slected utility ", selected_utility);
        //console.log("SliderVar_Point_list", Object.keys(SliderVar_Point_list[0])[0])
        for (i = 0; i < SliderVar_Point_list.length; i++) {
          //var object_key = Object.keys(SliderVar_Point_list[i])[i]
          console.log("object_key_value ", Object.keys(SliderVar_Point_list[i])[0])

          //object_key.push(Object.keys(SliderVar_Point_list[i])[0])

          if ((Object.keys(SliderVar_Point_list[i])[0]) == (selected_utility)) {
            SliderVar_utility_value.push(SliderVar_Point_list[i]);
          }
        }

        //console.log("object_key_value ",object_key)
        console.log("SliderVar_Point_list ", SliderVar_utility_value);

        //console.log("SliderFix_utility_value 414",SliderFix_utility_value)
        // $.each(SliderVar_utility_value, function (sliderVar_item) {
        //   if ((SliderVar_utility_value[sliderVar_item].val()).indexOf(selected_utility) !== -1) {
        //     //console.log(SliderFix_item_list[sliderFix_item]);
        //     SliderVar_list3.push(SliderVar_utility_value[sliderFix_item]);
        //   }
        // });

        //console.log("list 3 424 ", SliderFix_list3);
        $(".chosen-value-fullpoint").find("option").remove().end();
        $.each(SliderVar_utility_value, function (test3) {
          $(".chosen-value-fullpoint").append(
            $("<option></option>")
              .attr("value", SliderVar_utility_value[test3][selected_utility])
              .text(SliderVar_utility_value[test3][selected_utility])
          );
        });
      });

      $(".chosen-value-fullpoint").on("change", () => {
        var SliderVar_utility_value = []
        var date = []
        var selected_full_utility = $(".chosen-value-fullpoint").val();
        var selected_operation = $(".chosen-value-operation").val()
        var selected_system = $(".chosen-value-systems").val()
        //console.log("selected_full_utility ", selected_full_utility);
        for (i = 0; i < Slider_Var_Overall.length; i++) {
          if (selected_full_utility == Slider_Var_Overall[i]["Point"]) {
            //console.log("lastttttttt ",Slider_Fix_Overall[i]["Value"])
            SliderVar_utility_value.push(Slider_Var_Overall[i]["Value"])
            date.push(Slider_Var_Overall[i]["Date"])
          }
        }
        //console.log("SliderFix_utility_value  ",SliderFix_utility_value)
        // PLOT LINE CHERT HERE
        var seriesJson = [{
          "name": selected_full_utility,
          "data": SliderVar_utility_value
        }]
        //series.append(seriesJson)
        checkData(selected_operation, selected_system, date, seriesJson)
      })
    }
    if (selected == "HSA FIX") {
      const Hsa_Fix_Overall = HsaFix;
      const Hsa_Fix_Point = HsaFix_Point; //difernt value
      const Utility_list = [];

      //console.log("slider fix point ", (SliderFix_Point[1].CHILLER).length)
      HsaFix_system_list = [];
      HsaFix_Point_list = [];

      for (i = 0; i < Hsa_Fix_Point.length; i++) {
        var HsaFix_n = Hsa_Fix_Point[i];
        HsaFix_Point_list.push(HsaFix_n);
        HsaFix_system_list.push(Object.keys(HsaFix_n)[0]);
      }
      console.log(HsaFix_system_list);

      $(".chosen-value-systems").find("option").remove().end();
      $.each(HsaFix_system_list, function (item) {
        $(".chosen-value-systems").append(
          $("<option></option>")
            .attr("value", HsaFix_system_list[item])
            .text(HsaFix_system_list[item])
        );
        //console.log(SliderFix_system_list[item])
      });

      $(".chosen-value-systems").on("change", () => {
        HsaFix_list = []; //RENAME LATER
        HsaFix_Value_list = [];

        $(".chosen-value-fullpoint")
          .find("option")
          .remove()
          .end()
          .append(
            $("<option></option>")
              .attr("value", "Select Utility")
              .text("Select Utility")
          );

        var selected_system = $(".chosen-value-systems").val();
        console.log("slected system ", selected_system);
        HsaFix_Value_list = [];
        HsaFix_point_list = [];

        // FOR TESTTTTTTTTT
        for (i = 0; i < Hsa_Fix_Overall.length; i++) {
          var hsafix_value = Hsa_Fix_Overall[i]["System"];
          if (hsafix_value == selected_system) {
            HsaFix_Value_list.push(Hsa_Fix_Overall[i]["Value"]);
            HsaFix_point_list.push(Hsa_Fix_Overall[i]["Point"]);
          }
        }
        console.log("value list ", HsaFix_Value_list); // record all values of chiller value
        console.log("value list 356 ", HsaFix_point_list);

        if (selected_system.indexOf(HsaFix_system_list)) {
          //console.log(typeof SliderFix_system_list[1])
          //console.log(Object.values(SliderFix_Point_list))
          for (i = 0; i < HsaFix_Point_list.length; i++) {
            //console.log(SliderFix_Point_list[i][selected_system])
            HsaFix_list.push(HsaFix_Point_list[i][selected_system]);
          }
        }

        HsaFix_list2 = []; //RENAME LATER
        HsaFix_item_list = [];
        console.log(HsaFix_list);
        $.each(HsaFix_list, function (item) {
          if (HsaFix_list[item] !== undefined) {
            console.log("test list ", HsaFix_list[item]);
            //var testtttt = SliderFix_list[item]

            $.each(HsaFix_list[item], function (item2) {
              HsaFix_item_list.push(HsaFix_list[item][item2]);
              var cut_string = HsaFix_list[item][item2].slice(0, 4);
              if (HsaFix_list2.indexOf(cut_string) === -1) {
                HsaFix_list2.push(cut_string);
              }
            });
          }
        });

        console.log("slider fix list2 ", HsaFix_list2);
        $(".chosen-value-point").find("option").remove().end();
        $.each(HsaFix_list2, function (HsaFix) {
          $(".chosen-value-point").append(
            $("<option></option>")
              .attr("value", HsaFix_list2[HsaFix])
              .text(HsaFix_list2[HsaFix])
          );
        });
      });

      $(".chosen-value-point").on("change", () => {
        HsaFix_list3 = [];
        HsaFix_utility_value = [];
        selected_utility_list = []
        var selected_utility = $(".chosen-value-point").val();
        console.log("slected utility ", selected_utility[1]);

        selected_utility_list.push(selected_utility)

        console.log("selected_utility_list ", selected_utility_list)

        // for (i = 0; i < HsaFix_point_list.length; i++) {
        //   for (j = 0; j < selected_utility.length; j++) {
        //     if (HsaFix_point_list[i].indexOf(selected_utility[j]) !== -1) {
        //       HsaFix_utility_value.push(HsaFix_Value_list[i]);
        //     }
        //     else {
        //       console.log("nooooooob!")
        //     }
        //   }
        // }
        // console.log("HsaFix_utility_value 414", HsaFix_utility_value);

        $.each(HsaFix_item_list, function (HsaFix_item) {
          for (i = 0; i < selected_utility.length; i++) {
            if (HsaFix_item_list[HsaFix_item].indexOf(selected_utility[i]) !== -1) {
              console.log(HsaFix_item_list[HsaFix_item]);
              HsaFix_list3.push(HsaFix_item_list[HsaFix_item]);
            }
          }
        });

        console.log("list 3 ", HsaFix_list3);
        $(".chosen-value-fullpoint").find("option").remove().end();
        $.each(HsaFix_list3, function (test3) {
          $(".chosen-value-fullpoint").append(
            $("<option></option>")
              .attr("value", HsaFix_list3[test3])
              .text(HsaFix_list3[test3])
          );
        });
      });

      $(".chosen-value-fullpoint").on("change", () => {
        var HsaFix_utility_value = [];
        var date = [];
        var selected_full_utility = $(".chosen-value-fullpoint").val();
        var selected_operation = $(".chosen-value-operation").val();
        var selected_system = $(".chosen-value-systems").val();
        //console.log("selected_full_utility ", selected_full_utility);
        for (i = 0; i < Hsa_Fix_Overall.length; i++) {
          if (selected_full_utility[i] == Hsa_Fix_Overall[i]["Point"]) {
            //console.log("lastttttttt ",Slider_Fix_Overall[i]["Value"])
            HsaFix_utility_value.push(Hsa_Fix_Overall[i]["Value"]);
            date.push(Hsa_Fix_Overall[i]["Date"]);
          }
        }
        console.log("SliderFix_utility_value  ",Hsa_Fix_Overall)
        // PLOT LINE CHERT HERE
        var seriesJson = [
          {
            "name": selected_full_utility,
            "data": HsaFix_utility_value,
          },
        ];
        //series.append(seriesJson)
        checkData(selected_operation, selected_system, date, seriesJson);
      });
    } //cannot do multiselect
    if (selected == "HSA VAR") {
      const Hsa_Var_Overall = HsaVar;
      const Hsa_Var_Point = HsaVar_Point; //difernt value
      const Utility_list = [];

      //console.log("slider fix point ", (SliderFix_Point[1].CHILLER).length)
      HsaVar_system_list = ["select system"];
      HsaVar_Point_list = [];

      for (i = 0; i < Hsa_Var_Point.length; i++) {
        var HsaVar_n = Hsa_Var_Point[i];
        HsaVar_Point_list.push(HsaVar_n);
        HsaVar_system_list.push(Object.keys(HsaVar_n)[0]);
      }
      console.log(HsaVar_Point_list);

      $(".chosen-value-systems").find("option").remove().end();
      $.each(HsaVar_system_list, function (item) {
        $(".chosen-value-systems").append(
          $("<option></option>")
            .attr("value", HsaVar_system_list[item])
            .text(HsaVar_system_list[item])
        );
        //console.log(SliderFix_system_list[item])
      });

      // ####################### there is some problem here
      $(".chosen-value-systems").on("change", () => {
        HsaVar_list = []; //RENAME LATER
        var selected_system = $(".chosen-value-systems").val();
        console.log("slected system ", selected_system);
        if (selected_system.indexOf(HsaVar_system_list)) {
          //console.log(typeof SliderFix_system_list[1])
          //console.log(Object.values(SliderFix_Point_list))
          for (i = 0; i < HsaVar_Point_list.length; i++) {
            //console.log(SliderFix_Point_list[i][selected_system])
            HsaVar_list.push(HsaVar_Point_list[i][selected_system]);
          }
        }

        HsaVar_list2 = ["select utility"]; //RENAME LATER
        HsaVar_item_list = []; //RENAME LATER
        console.log("hsa var list ", HsaVar_list);
        $.each(HsaVar_list, function (item) {
          if (HsaVar_list[item] !== undefined) {
            console.log("test list ", HsaVar_list[item]);
            //var testtttt = SliderFix_list[item]

            $.each(HsaVar_list[item], function (item2) {
              var cut_string = HsaVar_list[item][item2].slice(0, 8);
              if (HsaVar_list2.indexOf(cut_string) === -1) {
                HsaVar_list2.push(cut_string);
              }
            });
          }
        });

        console.log("slider fix list2 ", HsaVar_list2);
        $(".chosen-value-point").find("option").remove().end();
        $.each(HsaVar_list2, function (HsaVar) {
          $(".chosen-value-point").append(
            $("<option></option>")
              .attr("value", HsaVar_list2[HsaVar])
              .text(HsaVar_list2[HsaVar])
          );
        });
        console.log("Hsa Var lis 2  ", HsaVar_list2);
      });

      //RENAME LATER
      $(".chosen-value-point").on("change", () => {
        HsaVar_list3 = ["select point"];
        HsaVar_utility_value = []
        var selected_utility = $(".chosen-value-point").val();
        console.log("slected utility ", selected_utility);
        for (i = 0; i < HsaVar_Point_list.length; i++) {
          var object_value = Object.values(HsaVar_Point_list[i])
          console.log("HsaVar_Point_list", object_value[i][0])
          if (object_value[i][0].indexOf(selected_utility) !== -1) {
            HsaVar_list3.push(object_value[i][0])
          }
          else {
            console.log("not index of")
          }
        }
        console.log("HsaVar_utility_value ", HsaVar_utility_value)
        //console.log("SliderFix_utility_value 414",SliderFix_utility_value)
        // $.each(HsaVar_list, function (hsavar_item) {
        //   if (
        //     HsaVar_list[hsavar_item].indexOf(selected_utility) !== -1
        //   ) {
        //     //console.log(SliderFix_item_list[sliderFix_item]);
        //     HsaVar_list3.push(HsaVar_list[hsavar_item]);
        //   }
        // });

        //console.log("list 3 424 ", SliderFix_list3);
        $(".chosen-value-fullpoint").find("option").remove().end();
        $.each(HsaVar_list3, function (test3) {
          $(".chosen-value-fullpoint").append(
            $("<option></option>")
              .attr("value", HsaVar_list3[test3])
              .text(HsaVar_list3[test3])
          );
        });
      });


      $(".chosen-value-fullpoint").on("change", () => {
        var HsaVar_utility_value = []
        var date = []
        var selected_full_utility = $(".chosen-value-fullpoint").val();
        var selected_operation = $(".chosen-value-operation").val()
        var selected_system = $(".chosen-value-systems").val()
        //console.log("selected_full_utility ", selected_full_utility);
        for (i = 0; i < Hsa_Var_Overall.length; i++) {
          if (selected_full_utility == Hsa_Var_Overall[i]["Point"]) {
            //console.log("lastttttttt ",Slider_Fix_Overall[i]["Value"])
            HsaVar_utility_value.push(Hsa_Var_Overall[i]["Value"])
            date.push(Hsa_Var_Overall[i]["Date"])
          }
        }

        console.log(date)
        //console.log("SliderFix_utility_value  ",SliderFix_utility_value)
        // PLOT LINE CHERT HERE
        var seriesJson = [{
          "name": selected_full_utility,
          "data": HsaVar_utility_value
        }]
        //series.append(seriesJson)
        checkData(selected_operation, selected_system, date, seriesJson)
      })
    } //not finished
    if (selected == "Drive FIX") {
      const Drive_Fix_Overall = DriveFix;
      const Drive_Fix_Point = DriveFix_Point; //difernt value
      const Utility_list = [];

      //console.log("slider fix point ", (SliderFix_Point[1].CHILLER).length)
      DriveFix_system_list = [];
      DriveFix_Point_list = [];

      for (i = 0; i < Drive_Fix_Point.length; i++) {
        var DriveFix_n = Drive_Fix_Point[i];
        DriveFix_Point_list.push(DriveFix_n);
        DriveFix_system_list.push(Object.keys(DriveFix_n)[0]);
      }
      console.log(DriveFix_system_list);

      $(".chosen-value-systems").find("option").remove().end();
      $.each(DriveFix_system_list, function (item) {
        $(".chosen-value-systems").append(
          $("<option></option>")
            .attr("value", DriveFix_system_list[item])
            .text(DriveFix_system_list[item])
        );
        //console.log(SliderFix_system_list[item])
      });

      $(".chosen-value-systems").on("change", () => {
        DriveFix_list = []; //RENAME LATER
        DriveFix_Value_list = [];

        $(".chosen-value-fullpoint")
          .find("option")
          .remove()
          .end()
          .append(
            $("<option></option>")
              .attr("value", "Select Utility")
              .text("Select Utility")
          );

        var selected_system = $(".chosen-value-systems").val();
        console.log("slected system ", selected_system);
        DriveFix_Value_list = [];
        DriveFix_point_list = [];

        // FOR TESTTTTTTTTT
        for (i = 0; i < Drive_Fix_Overall.length; i++) {
          var drivefix_value = Drive_Fix_Overall[i]["System"];
          if (drivefix_value == selected_system) {
            DriveFix_Value_list.push(Drive_Fix_Overall[i]["Value"]);
            DriveFix_point_list.push(Drive_Fix_Overall[i]["Point"]);
          }
        }

        console.log("value list ", DriveFix_Value_list);
        console.log("value list 356 ", DriveFix_point_list);

        if (selected_system.indexOf(DriveFix_system_list)) {
          //console.log(typeof SliderFix_system_list[1])
          //console.log(Object.values(SliderFix_Point_list))
          for (i = 0; i < DriveFix_Point_list.length; i++) {
            //console.log(SliderFix_Point_list[i][selected_system])
            DriveFix_list.push(DriveFix_Point_list[i][selected_system]);
          }
        }

        DriveFix_list2 = []; //RENAME LATER
        DriveFix_item_list = [];
        console.log("hsa var list ", DriveFix_list);
        $.each(DriveFix_list, function (item) {
          if (DriveFix_list[item] !== undefined) {
            console.log("test list ", DriveFix_list[item]);
            //var testtttt = SliderFix_list[item]
            $.each(DriveFix_list[item], function (item2) {
              DriveFix_item_list.push(DriveFix_list[item][item2]);
              var cut_string = DriveFix_list[item][item2].slice(0, 4);
              if (DriveFix_list2.indexOf(cut_string) === -1) {
                DriveFix_list2.push(cut_string);
              }
            });
          }
        });

        console.log("slider fix list2 ", DriveFix_list2);
        $(".chosen-value-point").find("option").remove().end();
        $.each(DriveFix_list2, function (DriveFix) {
          $(".chosen-value-point").append(
            $("<option></option>")
              .attr("value", DriveFix_list2[DriveFix])
              .text(DriveFix_list2[DriveFix])
          );
        });
        console.log("Hsa Var lis 2  ", DriveFix_list2);
      });

      $(".chosen-value-point").on("change", () => {
        DriveFix_list3 = [];
        DriveFix_utility_value = [];

        var selected_utility = $(".chosen-value-point").val();
        console.log("slected utility ", selected_utility);
        for (i = 0; i < DriveFix_point_list.length; i++) {
          if (DriveFix_point_list[i].indexOf(selected_utility) !== -1) {
            DriveFix_utility_value.push(DriveFix_Value_list[i]);
          }
        }
        console.log("SliderFix_utility_value 414", DriveFix_utility_value);

        $.each(DriveFix_item_list, function (DriveFix_item) {
          if (
            DriveFix_item_list[DriveFix_item].indexOf(selected_utility) !== -1
          ) {
            console.log(DriveFix_item_list[DriveFix_item]);
            DriveFix_list3.push(DriveFix_item_list[DriveFix_item]);
          }
        });

        console.log("list 3 ", DriveFix_list3);
        $(".chosen-value-fullpoint").find("option").remove().end();
        $.each(DriveFix_list3, function (test3) {
          $(".chosen-value-fullpoint").append(
            $("<option></option>")
              .attr("value", DriveFix_list3[test3])
              .text(DriveFix_list3[test3])
          );
        });
      });

      $(".chosen-value-fullpoint").on("change", () => {
        var DriveFix_utility_value = [];
        var date = [];
        var selected_full_utility = $(".chosen-value-fullpoint").val();
        var selected_operation = $(".chosen-value-operation").val();
        var selected_system = $(".chosen-value-systems").val();
        //console.log("selected_full_utility ", selected_full_utility);
        for (i = 0; i < Drive_Fix_Overall.length; i++) {
          if (selected_full_utility == Drive_Fix_Overall[i]["Point"]) {
            //console.log("lastttttttt ",Slider_Fix_Overall[i]["Value"])
            DriveFix_utility_value.push(Drive_Fix_Overall[i]["Value"]);
            date.push(Drive_Fix_Overall[i]["Date"]);
          }
        }
        //console.log("SliderFix_utility_value  ",SliderFix_utility_value)
        // PLOT LINE CHERT HERE
        var seriesJson = [
          {
            "name": selected_full_utility,
            "data": DriveFix_utility_value,
          },
        ];
        //series.append(seriesJson)
        checkData(selected_operation, selected_system, date, seriesJson);
      });
    } // is somethig wrong
    if (selected == "Drive VAR") {
      alert("Bug")
      const Drive_Var_Overall = DriveVar;
      const Drive_Var_Point = DriveVar_Point; //difernt value
      const Utility_list = [];

      console.log(Drive_Var_Overall);

      //console.log("slider fix point ", (SliderFix_Point[1].CHILLER).length)
      DriveVar_system_list = [];
      DriveVar_Point_list = [];

      for (i = 0; i < Drive_Var_Point.length; i++) {
        var DriveVar_n = Drive_Var_Point[i];
        DriveVar_Point_list.push(DriveVar_n);
        DriveVar_system_list.push(Object.keys(DriveVar_n)[0]);
      }
      console.log(DriveVar_system_list);

      $(".chosen-value-systems").find("option").remove().end();
      $.each(DriveVar_system_list, function (item) {
        $(".chosen-value-systems").append(
          $("<option></option>")
            .attr("value", DriveVar_system_list[item])
            .text(DriveVar_system_list[item])
        );
        //console.log(SliderFix_system_list[item])
      });

      $(".chosen-value-systems").on("change", () => {
        DriveVar_list = []; //RENAME LATER
        DriveVar_Value_list = [];

        // $(".chosen-value-fullpoint")
        //   .find("option")
        //   .remove()
        //   .end()
        //   .append(
        //     $("<option></option>")
        //       .attr("value", "Select Utility")
        //       .text("Select Utility")
        //   );

        var selected_system = $(".chosen-value-systems").val();
        console.log("slected system ", selected_system);
        DriveVar_Value_list = [];
        DriveVar_point_list = [];

        // FOR TESTTTTTTTTT
        for (i = 0; i < Drive_Var_Overall.length; i++) {
          var drivevar_value = Drive_Var_Overall[i]["System"];
          console.log("drive var ", drivevar_value);
          if (drivevar_value == selected_system) {
            DriveVar_Value_list.push(Drive_Var_Overall[i]["Value"]);
            DriveVar_point_list.push(Drive_Var_Overall[i]["Point"]);
          }
        }

        console.log("value list ", DriveVar_Value_list);
        console.log("value list 356 ", DriveVar_point_list);

        if (selected_system.indexOf(DriveVar_system_list)) {
          //console.log(typeof SliderFix_system_list[1])
          //console.log(Object.values(SliderFix_Point_list))
          for (i = 0; i < DriveVar_Point_list.length; i++) {
            //console.log(SliderFix_Point_list[i][selected_system])
            DriveVar_list.push(DriveVar_Point_list[i][selected_system]);
          }
        }

        DriveVar_list2 = []; //RENAME LATER
        DriveVar_item_list = [];
        console.log("hsa var list ", DriveVar_list);
        $.each(DriveVar_list, function (item) {
          if (DriveVar_list[item] !== undefined) {
            console.log("test list ", DriveVar_list[item]);
            //var testtttt = SliderFix_list[item]

            $.each(DriveVar_list[item], function (item2) {
              DriveVar_item_list.push(DriveVar_list[item][item2]);
              var cut_string = DriveVar_list[item][item2].slice(0, 4);
              if (DriveVar_list2.indexOf(cut_string) === -1) {
                DriveVar_list2.push(cut_string);
              }
            });
          }
        });

        console.log("slider fix list2222 ", DriveVar_item_list);
        $(".chosen-value-point").find("option").remove().end();
        $.each(DriveVar_list2, function (DriveVar) {
          $(".chosen-value-point").append(
            $("<option></option>")
              .attr("value", DriveVar_list2[DriveVar])
              .text(DriveVar_list2[DriveVar])
          );
        });
        console.log("Hsa Var lis 2  ", DriveVar_list2);

        $(".chosen-value-point").on("change", () => {
          DriveVar_list3 = [];
          DriveVar_utility_value = [];

          var selected_utility = $(".chosen-value-point").val();
          console.log("slected utility ", selected_utility);
          for (i = 0; i < DriveVar_point_list.length; i++) {
            if (DriveVar_point_list[i].indexOf(selected_utility) !== -1) {
              DriveVar_utility_value.push(DriveVar_Value_list[i]);
            }
          }
          console.log("SliderFix_utility_value 414", DriveVar_utility_value);
          $.each(DriveVar_item_list, function (DriveVar_item) {
            if (
              DriveVar_item_list[DriveVar_item].indexOf(selected_utility) !== -1
            ) {
              console.log(DriveVar_item_list[DriveVar_item]);
              DriveVar_list3.push(DriveVar_item_list[DriveVar_item]);
            }
          });

          console.log("list 3 ", DriveVar_list3);
          $(".chosen-value-fullpoint").find("option").remove().end();
          $.each(DriveVar_list3, function (test3) {
            $(".chosen-value-fullpoint").append(
              $("<option></option>")
                .attr("value", DriveVar_list3[test3])
                .text(DriveVar_list3[test3])
            );
          });
        });

        utility_value_list = [];
        $(".chosen-value-fullpoint").on("change", () => {
          var DriveVar_utility_value = [];
          var date = [];
          var selected_full_utility = $(".chosen-value-fullpoint").val();
          var selected_operation = $(".chosen-value-operation").val();
          var selected_system = $(".chosen-value-systems").val();
          //console.log("selected_full_utility ", selected_full_utility);
          for (i = 0; i < Drive_Var_Overall.length; i++) {
            if (selected_full_utility == Drive_Var_Overall[i]["Point"]) {
              //console.log("lastttttttt ",Slider_Fix_Overall[i]["Value"])
              DriveVar_utility_value.push(Drive_Var_Overall[i]["Value"]);
              date.push(Drive_Var_Overall[i]["Date"]);
            }
          }
          console.log("DriveVar_utility_value ", DriveVar_utility_value);
          //console.log("SliderFix_utility_value  ",SliderFix_utility_value)
          // PLOT LINE CHERT HERE
          var seriesJson = [{
              name: selected_full_utility,
              data: DriveVar_utility_value
          }];
          //series.append(seriesJson)
          checkData(selected_operation, selected_system, date, seriesJson)
        });
        //console.log("lastttttttt ",utility_value_list)
      });
    }
    //console.log("log", $(".chosen-value-systems")); ลบ point ของ operation อื่นออกหมดดดดดดดดดดดด!!!
  });
}

function checkData(selected_operation, selected_system, date, seriesJson) {
  console.log("check ", seriesJson);
  console.log("system", selected_system);
  //console.log("date hhhhhhhhhhhhhhhhhhhhhh", SliderFix_utility_date[0])
  Highcharts.chart("container-chart", {
    chart: {
      type: "spline",
    },
    title: {
      text: "Consumption Analysis Graph of " + selected_operation,
    },

    subtitle: {
      text: "System: " + selected_system,
    },

    yAxis: {
      title: {
        text: "Number of Used (kW)",
      },
    },

    xAxis: {
      accessibility: {
        rangeDescription: "",
      },
      categories: date,
    },

    legend: {
      layout: "vertical",
      // align: "right",
      verticalAlign: "bottom",
    },

    plotOptions: {
      series: {
        label: {
          connectorAllowed: false,
        },
        //pointStart: SliderFix_utility_date,
      },
    },
    series: seriesJson,
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 800,
          },
          chartOptions: {
            legend: {
              layout: "horizontal",
              align: "center",
              verticalAlign: "bottom",
            },
          },
        },
      ],
    },
  });
}


// /////////////////////// TEST MULTI SELECT /////////////////////////////////////////
document.multiselect('#testSelect1')
		.setCheckBoxClick("checkboxAll", function(target, args) {
			console.log("Checkbox 'Select All' was clicked and got value ", args.checked);
		})
		.setCheckBoxClick("1", function(target, args) {
			console.log("Checkbox for item with value '1' was clicked and got value ", args.checked);
		});