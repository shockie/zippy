# zippyjs distribution build
SOURCES = lang/function.js lang/class.js mvc/zippy.js mvc/event.js mvc/model.js mvc/view.js mvc/controller.js mvc/router.js
DIST_DIR = dist/
concatenate:
	@echo "concatenating files"
	@awk '{print}' ${SOURCES} > zippy.min.js

compile: concatenate
	@echo "closure compile it"
	@curl -s -d compilation_level=SIMPLE_OPTIMIZATIONS -d output_format=text -d output_info=compiled_code --data-urlencode "js_code@zippy.min.js" -o zippy.min.js http://closure-compiler.appspot.com/compile

install: compile
	@mkdir ${DIST_DIR}
	@mv zippy.min.js ${DIST_DIR}zippy.min.js
	@echo "zipyy.min.js is ready"
clean:
	@rm ${DIST_DIR}zippy.min.js
	@rm -rf ${DIST_DIR}
