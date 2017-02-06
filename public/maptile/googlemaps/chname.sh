<< mark

for file in `find -name *.png | grep '[a-z]'`
  do
    str=`echo $file | tr 'a-z' 'A-Z'`
    mv $file $str
    echo $str
done

mark
