src_dir = src
version = $(shell cat version.txt)
projectName = jChain
finalFile = $(projectName)-$(version).js
tmp = $(finalFile).tmp
modules = $(src_dir)/jChain.js
$(finalFile): $(modules)
	@@echo "Building" $(finalFile) "..."
	@@cat -s $(modules) > $(tmp)
	@@echo "Copying" $(tmp) "to" $(finalFile) "..."
	@@cp -u $(tmp) $(finalFile)
	@@echo "Deleting" $(tmp)
	@@rm $(tmp)
	@@echo "Building complete."