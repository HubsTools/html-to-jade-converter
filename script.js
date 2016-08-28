var input    = document.querySelector('[data-action=input]'),
    output   = document.querySelector('[data-action=output]'),
    convert  = document.querySelector('[data-action=convert]'),
    download = document.querySelector('[data-action=download]'),
    clear    = document.querySelector('[data-action=clear]');

var H2J = function() {
  Html2Jade.convertHtml(input.value, {selectById: true}, function (err, jadeString) {
    if(err) {
      console.error(err);
      alertify.error(err);
    } else {
      if (!/<html>/.test(input.value)) {
        jadeString = jadeString
                      .replace('html\n', '')
                      .replace('head\n', '')
                      .replace(/^\s\s/, '')
                      .replace(/\n\s\s/, '\n');
      }

      if (!/<body>/.test(input.value)) {
        jadeString = jadeString
                      .replace(/.*body\n/, '')
                      .replace(/^\s\s/, '')
                      .replace(/\n\s\s/, '\n');
      };

      output.value = jadeString;
    }
  });
};

input.onchange = function() {
  H2J();
};

input.onkeyup = function() {
  H2J();
};

convert.onclick = function() {
  H2J();
};

output.onclick = function() {
  this.select();
};

download.onclick = function() {
  if (!output.value) {
    alertify.error('No output defined!');
  } else {
    alertify.prompt('Save file name', '', (function(evt, value) {
      var blob;
      blob = new Blob([output.value], {
        type: 'text/x-jade'
      });
      saveAs(blob, value + '.jade');
    }), function() {
      alertify.error('Download operation aborted.');
    }).set('basic', true);
  }
};

clear.onclick = function() {
  input.value  = '';
  output.value = '';
};
