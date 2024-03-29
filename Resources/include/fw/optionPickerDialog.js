/**
 * optionPickerDialog.js
 *
 * Works like an OptionDialog, but with a Picker object.
 *
 * Limitations (needs improvements):
 *  - Only supports a single column picker.
 *  - Not a true modal. Does not overlay TabGroup and etc.
 *
 *  Usage:
 *  <code>
 *  // Include component in page
 *  Ti.include('../optionPickerDialog.js');
 *
 *  // Set data in picker and open as a modal
 *  optionPickerDialog.setData([
 *      {title:'Option A'}, {title:'Option B'}, {title:'Option C'}
 *  ]);
 *  optionPickerDialog.open();
 *
 *  // Respond when selection made and close
 *  optionPickerDialog.addEventListener('close', function(e){
 *      if (e.done==true && e.selectedRow){
 *          alert('You selected '+e.selectedRow.title);
 *      }
 *  });
 *  </code>
 *
 * @link http://developer.appcelerator.com/apidoc/mobile/latest/Titanium.UI.OptionDialog-object
 * @link http://cssgallery.info/making-a-combo-box-in-titanium-appcelerator-code-and-video/
 *
 * @author Bart Lewis <bartlewis@gmail.com>
 */

var optionPickerDialog = (function(){
	var e, callbackOnClose, isControlsCreated = false;
	var containerViewOpenAnimation, containerViewCloseAnimation, cancelButton;
	var doneButton, flexibleSpace, toolbar, picker, containerView, coverView;

	function createControls(){
		if (isControlsCreated) {return;}

		coverViewOpenAnimation = Ti.UI.createAnimation({opacity:0.5});
		coverViewCloseAnimation = Ti.UI.createAnimation({opacity:0});
		containerViewOpenAnimation = Ti.UI.createAnimation({bottom:0});
		containerViewCloseAnimation = Ti.UI.createAnimation({bottom:-251});

		cancelButton =  Ti.UI.createButton({
			title:'Cancel',
			style:Ti.UI.iPhone.SystemButtonStyle.BORDERED
		});
		cancelButton.addEventListener('click', function(){
			e.cancel = true;
			api.close();
		});

		doneButton =  Ti.UI.createButton({
			title:'Done',
			style:Ti.UI.iPhone.SystemButtonStyle.DONE
		});
		doneButton.addEventListener('click', function(){
			e.done = true;
			e.selectedRow = picker.getSelectedRow(0);
			api.close();
		});

		flexibleSpace =  Ti.UI.createButton({
			systemButton:Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE
		});

		toolbar =  Ti.UI.createToolbar({
			top:0,
			items:[cancelButton, flexibleSpace, doneButton]
		});

		picker = Ti.UI.createPicker({top:43, selectionIndicator:true});

		containerView = Ti.UI.createView({height:251, bottom:-251, zIndex:9});
		containerView.add(toolbar);
		containerView.add(picker);
		Ti.UI.currentWindow.add(containerView);

		coverView = Ti.UI.createView({
			height:'100%',
			width:'100%',
			backgroundColor:'#000',
			opacity:0,
			zIndex:8
		});
		Ti.UI.currentWindow.add(coverView);

		isControlsCreated = true;
	}

	/**
	 * Public API
	 */
	var api = {};

	api.getPicker = function(){return picker;};
	api.open = function(){
		// Init callback event object
		e = {
			cancel:false,
			done:false,
			selectedRow:null
		};

		coverView.animate(coverViewOpenAnimation);
		containerView.animate(containerViewOpenAnimation);
	};
	api.close = function(){
		coverView.animate(coverViewCloseAnimation);
		containerView.animate(containerViewCloseAnimation);

		if (callbackOnClose){
			callbackOnClose(e);
		}
	};

	/**
	 * @param array of picker row object params [{title:'row a'}, {title:'row b'}]
	 */
	api.setData = function(data){
		var i = 0, len, property, row, rows = [], dataLength = data.length;

		createControls();

		// Start with a clean picker slate. Kill all existing rows in picker.
		if (picker.columns[0]){
			len = picker.columns[0].rowCount;
			for (i=len-1; i>=0; i--){
				picker.columns[0].removeRow(picker.columns[0].rows[i]);
			}
		}

		// Loop with each data instance to create picker rows
		for (i=0; i<dataLength; i++){
			row = Ti.UI.createPickerRow();
			// Add all documented and custom properties to row
			for (property in data[i]){
				if (Object.prototype.hasOwnProperty.call(data[i], property)){
					row[property] = data[i][property];
				}
			}
			rows.push(row);
		}
		picker.add(rows);
	};

	api.addEventListener = function(eventName, callback){
		if (eventName=='close') {callbackOnClose = callback;}
	};

	return api;
}());