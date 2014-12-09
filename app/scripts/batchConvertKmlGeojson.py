import os, sys

inpath = sys.argv[1]
outpath = inpath + '/geojson'
# outfile = open(outpath + '/out.txt', 'w')

# outpath = sys.argv[1]

try:
	# traverse root directory, and list directories as dirs and files as files
	for root, dirs, files in os.walk(inpath):
	    path = root.split('/')
	    # print len(path)
	    # print (len(path) - 1) *'---' , os.path.basename(root)       
	    for file in files:
	    	ext = file[-3:]
	    	if ext == "kml":
	    		if not os.path.exists(outpath):
	    			os.makedirs(outpath)

	    		geojson = file[:-4] + '.geojson\n'

	    		print 'Converting: ' + file + ' to ' + geojson

	    		# outfile.write('togeojson ' + inpath + '/' + file + ' > ' + outpath + '/' + geojson)
	    		os.system('togeojson ' + inpath + '/' + file + ' > ' + outpath + '/' + geojson)
finally:
	# outfile.close()
	print 'Done!'